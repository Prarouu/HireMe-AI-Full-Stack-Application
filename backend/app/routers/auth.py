from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.auth import (
    LoginRequest,
    OAuthCallbackRequest,
    SignupRequest,
    TokenResponse,
    UserResponse,
)
from app.services.auth_service import AuthService

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/signup", response_model=UserResponse)
def signup(payload: SignupRequest, db: Session = Depends(get_db)):
    return AuthService(db).signup(payload)


@router.post("/login", response_model=TokenResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    token = AuthService(db).login(payload)
    return TokenResponse(access_token=token)


@router.post("/google/callback", response_model=TokenResponse)
def google_callback(payload: OAuthCallbackRequest, db: Session = Depends(get_db)):
    token = AuthService(db).google_callback(payload)
    return TokenResponse(access_token=token)
