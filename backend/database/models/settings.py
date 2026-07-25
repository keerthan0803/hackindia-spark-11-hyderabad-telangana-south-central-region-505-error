from typing import Optional
from datetime import datetime
from pydantic import BaseModel, Field

class SettingsModel(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    userId: Optional[str] = None
    selectedModel: str = Field(default="qwen2.5:7b")
    temperature: float = Field(default=0.2, ge=0.0, le=1.0)
    notifications: bool = Field(default=True)
    exportFormat: str = Field(default="PDF")
    theme: str = Field(default="Light")
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {datetime: lambda v: v.isoformat()}

class SettingsUpdate(BaseModel):
    selectedModel: Optional[str] = "qwen2.5:7b"
    temperature: Optional[float] = 0.2
    notifications: Optional[bool] = True
    exportFormat: Optional[str] = "PDF"
    theme: Optional[str] = "Light"
