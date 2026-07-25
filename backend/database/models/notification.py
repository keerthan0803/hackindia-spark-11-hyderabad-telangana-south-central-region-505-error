from typing import Optional
from datetime import datetime
from enum import Enum
from pydantic import BaseModel, Field

class NotificationType(str, Enum):
    INFO = "Info"
    SUCCESS = "Success"
    WARNING = "Warning"
    ERROR = "Error"

class NotificationModel(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    userId: Optional[str] = None
    title: str
    message: str
    type: NotificationType = Field(default=NotificationType.INFO)
    isRead: bool = Field(default=False)
    createdAt: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {datetime: lambda v: v.isoformat()}

class NotificationCreate(BaseModel):
    userId: Optional[str] = None
    title: str
    message: str
    type: Optional[NotificationType] = NotificationType.INFO
