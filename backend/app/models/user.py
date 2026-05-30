from datetime import datetime
from enum import Enum

from sqlalchemy import DateTime, Enum as SQLEnum, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base


class UserRole(str, Enum):
    candidate = "candidate"
    company = "company"


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    email: Mapped[str] = mapped_column(String(180), unique=True, index=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=True)   # nullable for OAuth-only users
    role: Mapped[UserRole] = mapped_column(SQLEnum(UserRole), default=UserRole.candidate, nullable=False)
    oauth_provider: Mapped[str | None] = mapped_column(String(32), nullable=True)   # "google" | "apple"
    oauth_id: Mapped[str | None] = mapped_column(String(255), nullable=True, index=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)

    resumes = relationship("Resume", back_populates="user", cascade="all, delete-orphan")
