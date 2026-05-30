import httpx
from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.config import settings
from app.models.user import User
from app.schemas.auth import LoginRequest, OAuthCallbackRequest, SignupRequest
from app.utils.security import create_access_token, hash_password, verify_password

GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token"
GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo"


class AuthService:
    def __init__(self, db: Session) -> None:
        self.db = db

    # ── Email/password ──────────────────────────────────────────────────────

    def signup(self, payload: SignupRequest) -> User:
        existing = self.db.scalar(select(User).where(User.email == payload.email))
        if existing:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

        user = User(
            name=payload.name,
            email=payload.email,
            password_hash=hash_password(payload.password),
            role=payload.role,
        )
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user

    def login(self, payload: LoginRequest) -> str:
        user = self.db.scalar(select(User).where(User.email == payload.email))
        if not user or not user.password_hash or not verify_password(payload.password, user.password_hash):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")
        return create_access_token(str(user.id))

    # ── OAuth shared ────────────────────────────────────────────────────────

    def _oauth_login_or_create(self, *, email: str, name: str, provider: str, oauth_id: str) -> str:
        """Find existing user by email or oauth_id, or create a new one. Returns JWT."""
        user = self.db.scalar(
            select(User).where(User.oauth_provider == provider, User.oauth_id == oauth_id)
        )
        if not user:
            # Fall back to email match (user may have signed up with password before)
            user = self.db.scalar(select(User).where(User.email == email))

        if user:
            # Attach OAuth info if not already set
            if not user.oauth_provider:
                user.oauth_provider = provider
                user.oauth_id = oauth_id
                self.db.commit()
        else:
            user = User(
                name=name or email.split("@")[0],
                email=email,
                password_hash=None,
                oauth_provider=provider,
                oauth_id=oauth_id,
            )
            self.db.add(user)
            self.db.commit()
            self.db.refresh(user)

        return create_access_token(str(user.id))

    # ── Google ──────────────────────────────────────────────────────────────

    def google_callback(self, payload: OAuthCallbackRequest) -> str:
        if not settings.google_client_id or not settings.google_client_secret:
            raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Google OAuth is not configured")

        try:
            with httpx.Client(timeout=15) as client:
                token_resp = client.post(
                    GOOGLE_TOKEN_URL,
                    data={
                        "code": payload.code,
                        "client_id": settings.google_client_id,
                        "client_secret": settings.google_client_secret,
                        "redirect_uri": payload.redirect_uri,
                        "grant_type": "authorization_code",
                    },
                )
                token_resp.raise_for_status()
                tokens = token_resp.json()

                userinfo_resp = client.get(
                    GOOGLE_USERINFO_URL,
                    headers={"Authorization": f"Bearer {tokens['access_token']}"},
                )
                userinfo_resp.raise_for_status()
                userinfo = userinfo_resp.json()
        except httpx.HTTPStatusError as exc:
            raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail=f"Google OAuth failed: {exc.response.text}") from exc
        except httpx.RequestError as exc:
            raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail="Could not reach Google OAuth servers") from exc

        email = userinfo.get("email")
        if not email:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Google did not return an email address")

        return self._oauth_login_or_create(
            email=email,
            name=userinfo.get("name", ""),
            provider="google",
            oauth_id=userinfo["sub"],
        )
