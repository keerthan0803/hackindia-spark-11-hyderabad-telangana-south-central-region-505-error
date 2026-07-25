from datetime import datetime
from pydantic import BaseModel
from fastapi import APIRouter
from app.schemas.auth import SignUpRequest, LoginRequest
from app.schemas.response import APIResponse
from app.services.auth_service import AuthService

router = APIRouter(prefix="/auth", tags=["Authentication"])

class GoogleAuthRequest(BaseModel):
    credential: str

@router.post("/signup", response_model=APIResponse)
async def signup(req: SignUpRequest):
    service = AuthService()
    result = await service.register_user(req.model_dump())
    return APIResponse(
        success=True,
        message="Enterprise user registered successfully",
        data=result,
        timestamp=datetime.utcnow().isoformat()
    )

@router.post("/login", response_model=APIResponse)
async def login(req: LoginRequest):
    service = AuthService()
    result = await service.login_user(req.email, req.password)
    return APIResponse(
        success=True,
        message="Authentication successful",
        data=result,
        timestamp=datetime.utcnow().isoformat()
    )

@router.post("/google", response_model=APIResponse)
async def google_auth(req: GoogleAuthRequest):
    service = AuthService()
    result = await service.authenticate_google_user(req.credential)
    return APIResponse(
        success=True,
        message="Google OAuth 2.0 authentication successful",
        data=result,
        timestamp=datetime.utcnow().isoformat()
    )
