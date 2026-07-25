from typing import Optional, List, Dict, Any
from datetime import datetime
from pydantic import BaseModel, Field

class ReportModel(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    auditId: Optional[str] = None
    executiveSummary: str = Field(default="")
    overallDecision: str = Field(default="Needs Review")  # Cleared, Needs Review, High Risk
    topFindings: List[Dict[str, Any]] = Field(default_factory=list)
    recommendations: List[Dict[str, Any]] = Field(default_factory=list)
    reportJson: Dict[str, Any] = Field(default_factory=dict)
    pdfPath: Optional[str] = ""
    generatedAt: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {datetime: lambda v: v.isoformat()}

class ReportCreate(BaseModel):
    auditId: str
    executiveSummary: str
    overallDecision: Optional[str] = "Needs Review"
    topFindings: Optional[List[Dict[str, Any]]] = []
    recommendations: Optional[List[Dict[str, Any]]] = []
    reportJson: Optional[Dict[str, Any]] = {}
    pdfPath: Optional[str] = ""
