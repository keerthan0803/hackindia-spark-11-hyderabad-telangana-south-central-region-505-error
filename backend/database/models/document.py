from typing import Optional
from datetime import datetime
from pydantic import BaseModel, Field

class DocumentModel(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    auditId: Optional[str] = None
    originalFileName: str
    fileType: str = Field(default="pdf")
    fileSize: int = Field(default=0)  # Bytes
    filePath: str
    extractedText: Optional[str] = ""
    pageCount: int = Field(default=1)
    uploadedBy: Optional[str] = None
    uploadedAt: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {datetime: lambda v: v.isoformat()}

class DocumentCreate(BaseModel):
    auditId: Optional[str] = None
    originalFileName: str
    fileType: str
    fileSize: int
    filePath: str
    extractedText: Optional[str] = ""
    pageCount: Optional[int] = 1
