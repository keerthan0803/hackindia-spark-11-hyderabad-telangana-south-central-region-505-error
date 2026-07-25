from typing import Optional
from pydantic import BaseModel, EmailStr

class TokenSchema(BaseModel):
    access_token: str
    token_type: str = "bearer"

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class SignUpRequest(BaseModel):
    fullName: str
    email: EmailStr
    password: str
    organizationName: Optional[str] = "Global Audit Corp"
    role: Optional[str] = "Senior Auditor"
    department: Optional[str] = "Risk Intelligence"
