from pathlib import Path
from uuid import uuid4

from fastapi import HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app.ai.resume_analyzer import ResumeAnalyzer
from app.models.resume import Resume
from app.models.user import User
from app.schemas.resume import ResumeAnalysisResult
from app.utils.pdf import extract_pdf_text

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


class ResumeService:
    def __init__(self, db: Session) -> None:
        self.db = db
        try:
            self.analyzer = ResumeAnalyzer()
        except ValueError as exc:
            raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=str(exc)) from exc

    async def upload_and_analyze(self, current_user: User, file: UploadFile) -> Resume:
        if file.content_type != "application/pdf":
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Only PDF files are supported")

        raw = await file.read()
        extracted_text = extract_pdf_text(raw)
        if not extracted_text:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Could not extract text from PDF")

        filename = f"{uuid4()}-{file.filename}"
        file_path = UPLOAD_DIR / filename
        file_path.write_bytes(raw)

        try:
            analysis: ResumeAnalysisResult = self.analyzer.analyze(extracted_text)
        except RuntimeError as exc:
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail=f"AI analysis failed. {exc}",
            ) from exc

        resume = Resume(
            user_id=current_user.id,
            file_url=str(file_path),
            extracted_text=extracted_text,
            ai_summary=analysis.summary,
            skills=analysis.skills,
            recommended_roles=analysis.recommended_roles,
            experience_level=analysis.experience_level,
        )
        self.db.add(resume)
        self.db.commit()
        self.db.refresh(resume)
        return resume
