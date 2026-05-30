from datetime import datetime

from pydantic import BaseModel


class ResumeAnalysisResult(BaseModel):
    summary: str
    skills: list[str]
    recommended_roles: list[str]
    experience_level: str
    strengths: list[str]
    improvements: list[str]


class ResumeResponse(BaseModel):
    id: int
    user_id: int
    file_url: str
    extracted_text: str
    ai_summary: str | None
    skills: list[str] | None
    recommended_roles: list[str] | None
    experience_level: str | None
    created_at: datetime

    class Config:
        from_attributes = True
