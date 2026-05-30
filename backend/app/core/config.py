from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "HirePilot AI Backend"
    env: str = "development"
    api_prefix: str = "/api/v1"

    database_url: str = "postgresql+psycopg2://postgres:postgres@localhost:5432/hirepilot"

    jwt_secret: str = "change_this_in_production"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 120

    gemini_api_key: str = ""
    gemini_model: str = "gemini-1.5-flash"

    # Google OAuth
    google_client_id: str = ""
    google_client_secret: str = ""

    # Frontend base URL
    frontend_url: str = "http://localhost:3000"

    model_config = SettingsConfigDict(env_file=".env", case_sensitive=False, extra="ignore")


settings = Settings()
