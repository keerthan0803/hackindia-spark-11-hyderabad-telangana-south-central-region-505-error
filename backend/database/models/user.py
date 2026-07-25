from typing import Optional
from datetime import datetime
from pydantic import BaseModel, Field, EmailStr

class UserModel(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    fullName: str
    email: EmailStr
    passwordHash: str
    organizationId: Optional[str] = None
    role: str = Field(default="Viewer")  # Admin, Manager, Viewer
    department: Optional[str] = "General"
    avatar: Optional[str] = ""
    isVerified: bool = True
    lastLogin: Optional[datetime] = None
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {datetime: lambda v: v.isoformat()}

class UserCreate(BaseModel):
    fullName: str
    email: EmailStr
    password: str
    organizationId: Optional[str] = None
    role: Optional[str] = "Viewer"
    department: Optional[str] = "General"

class UserResponse(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    fullName: str
    email: EmailStr
    organizationId: Optional[str] = None
    role: str
    department: Optional[str] = None
    avatar: Optional[str] = None
    isVerified: bool
    lastLogin: Optional[datetime] = None
    createdAt: datetime

    class Config:
        populate_by_name = True
