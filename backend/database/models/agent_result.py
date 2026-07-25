from typing import Optional, List, Dict, Any
from datetime import datetime
from enum import Enum
from pydantic import BaseModel, Field

class AgentName(str, Enum):
    FINANCIAL = "Financial"
    LEGAL = "Legal"
    MARKET = "Market"
    SECURITY = "Security"
    COORDINATOR = "Coordinator"

class AgentResultModel(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    auditId: Optional[str] = None
    agentName: AgentName
    riskScore: int = Field(default=0, ge=0, le=100)
    severity: str = Field(default="Low")  # Low, Medium, High, Critical
    findings: List[Dict[str, Any]] = Field(default_factory=list)
    recommendations: List[Dict[str, Any]] = Field(default_factory=list)
    references: List[Dict[str, Any]] = Field(default_factory=list)
    confidence: int = Field(default=90, ge=0, le=100)
    executionTime: int = Field(default=0)  # Seconds
    createdAt: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {datetime: lambda v: v.isoformat()}

class AgentResultCreate(BaseModel):
    auditId: str
    agentName: AgentName
    riskScore: int
    severity: str
    findings: Optional[List[Dict[str, Any]]] = []
    recommendations: Optional[List[Dict[str, Any]]] = []
    references: Optional[List[Dict[str, Any]]] = []
    confidence: Optional[int] = 90
    executionTime: Optional[int] = 0
