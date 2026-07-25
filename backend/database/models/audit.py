from typing import Optional
from datetime import datetime
from enum import Enum
from pydantic import BaseModel, Field

class AuditPriority(str, Enum):
    LOW = "Low"
    MEDIUM = "Medium"
    HIGH = "High"
    CRITICAL = "Critical"

class AuditStatus(str, Enum):
    PENDING = "Pending"
    PROCESSING = "Processing"
    COMPLETED = "Completed"
    FAILED = "Failed"

class AuditSeverity(str, Enum):
    LOW = "Low"
    MEDIUM = "Medium"
    HIGH = "High"
    CRITICAL = "Critical"

class AuditModel(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    userId: Optional[str] = None
    organizationId: Optional[str] = None
    documentId: Optional[str] = None
    reportId: Optional[str] = None
    auditName: str = Field(default="Corporate Audit")
    priority: AuditPriority = Field(default=AuditPriority.HIGH)
    status: AuditStatus = Field(default=AuditStatus.PENDING)
    overallRisk: int = Field(default=0, ge=0, le=100)
    overallSeverity: AuditSeverity = Field(default=AuditSeverity.LOW)
    processingTime: int = Field(default=0)  # Seconds
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    completedAt: Optional[datetime] = None

    class Config:
        populate_by_name = True
        json_encoders = {datetime: lambda v: v.isoformat()}

class AuditCreate(BaseModel):
    auditName: str
    priority: Optional[AuditPriority] = AuditPriority.HIGH
    organizationId: Optional[str] = None
