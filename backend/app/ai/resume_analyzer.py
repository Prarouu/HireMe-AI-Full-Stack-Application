import json
from urllib import error, parse, request

from app.core.config import settings
from app.schemas.resume import ResumeAnalysisResult


class ResumeAnalyzer:
    def __init__(self) -> None:
        if not settings.gemini_api_key or settings.gemini_api_key == "your_gemini_key":
            raise ValueError("GEMINI_API_KEY is not configured. Set a valid API key in backend/.env.")
        self.endpoint = (
            f"https://generativelanguage.googleapis.com/v1beta/models/{settings.gemini_model}:generateContent"
        )

    def analyze(self, resume_text: str) -> ResumeAnalysisResult:
        prompt = f"""
You are an expert recruitment analyst. Analyze the resume and return strict JSON with this shape:
{{
  "summary": "string",
  "skills": ["string"],
  "recommended_roles": ["string"],
  "experience_level": "string",
  "strengths": ["string"],
  "improvements": ["string"]
}}

Rules:
- Keep skills and roles concise.
- Experience level must be one of: Entry-Level, Mid-Level, Senior-Level, Lead/Principal.
- JSON only, no markdown.

Resume:
{resume_text}
""".strip()

        try:
            payload = {
                "contents": [{"parts": [{"text": prompt}]}],
                "generationConfig": {"temperature": 0.2, "responseMimeType": "application/json"},
            }
            body = json.dumps(payload).encode("utf-8")
            req = request.Request(
                f"{self.endpoint}?key={parse.quote(settings.gemini_api_key)}",
                data=body,
                headers={"Content-Type": "application/json"},
                method="POST",
            )
            with request.urlopen(req, timeout=60) as response:
                raw = response.read().decode("utf-8")

            response_data = json.loads(raw)
            content = response_data["candidates"][0]["content"]["parts"][0]["text"].strip()
            data = json.loads(content)
            return ResumeAnalysisResult(**data)
        except error.HTTPError as exc:
            err_body = exc.read().decode("utf-8", errors="ignore")
            raise RuntimeError(f"Gemini request failed with status {exc.code}: {err_body}") from exc
        except (KeyError, IndexError, TypeError) as exc:
            raise RuntimeError("Gemini returned an unexpected response structure.") from exc
        except json.JSONDecodeError as exc:
            raise RuntimeError("Gemini returned an invalid JSON payload for resume analysis.") from exc
