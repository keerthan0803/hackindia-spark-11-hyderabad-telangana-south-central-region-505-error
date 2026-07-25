from typing import Optional
from datetime import datetime
from pydantic import BaseModel, Field

class ActivityLogModel(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    auditId: Optional[str] = None
    userId: Optional[str] = None
    action: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {datetime: lambda v: v.isoformat()}

class ActivityLogCreate(BaseModel):
    auditId: Optional[str] = None
    userId: Optional[str] = None
    action: str
