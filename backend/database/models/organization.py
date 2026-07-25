from typing import Optional
from datetime import datetime
from pydantic import BaseModel, Field

class OrganizationModel(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    organizationName: str
    industry: Optional[str] = "Technology"
    companySize: Optional[str] = "100-500"
    country: Optional[str] = "USA"
    timezone: Optional[str] = "UTC"
    createdBy: Optional[str] = None
    createdAt: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {datetime: lambda v: v.isoformat()}

class OrganizationCreate(BaseModel):
    organizationName: str
    industry: Optional[str] = "Technology"
    companySize: Optional[str] = "100-500"
    country: Optional[str] = "USA"
    timezone: Optional[str] = "UTC"
