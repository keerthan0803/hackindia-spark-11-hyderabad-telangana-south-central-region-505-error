import os
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "Adversarial Corporate Auditor API"
    VERSION: str = "5.0.0"
    API_V1_STR: str = "/api/v1"
    
    MONGODB_URL: str = os.getenv("MONGODB_URL", "")
    DATABASE_NAME: str = os.getenv("DATABASE_NAME", "CorporateAuditorDB")
    
    JWT_SECRET: str = os.getenv("JWT_SECRET", "super-secret-corporate-auditor-key-2026")
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 Days
    
    GOOGLE_CLIENT_ID: str = os.getenv("GOOGLE_CLIENT_ID", "")
    GOOGLE_CLIENT_SECRET: str = os.getenv("GOOGLE_CLIENT_SECRET", "")
    
    OLLAMA_MODEL: str = os.getenv("OLLAMA_MODEL", "qwen2.5:7b")
    OLLAMA_BASE_URL: str = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
    
    UPLOAD_DIR: str = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "uploads")
    REPORT_DIR: str = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "reports")

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()
