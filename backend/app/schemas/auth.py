from datetime import datetime

from pydantic import BaseModel, EmailStr

from app.models.user import UserRole


class SignupRequest(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: UserRole = UserRole.candidate


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class OAuthCallbackRequest(BaseModel):
    code: str
    redirect_uri: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: UserRole
    oauth_provider: str | None
    created_at: datetime

    class Config:
        from_attributes = True
