from datetime import datetime
from fastapi import APIRouter
from app.schemas.response import APIResponse

router = APIRouter(prefix="/help", tags=["Help & Documentation"])

@router.get("", response_model=APIResponse)
async def get_help_info():
    return APIResponse(
        success=True,
        message="Help & Documentation resources retrieved",
        data={
            "systemVersion": "5.0.0-Enterprise",
            "model": "Ollama + Qwen2.5:7B",
            "agents": ["Financial", "Legal", "Market", "Security", "Coordinator"],
            "docs": "https://auditguard.ai/docs"
        },
        timestamp=datetime.utcnow().isoformat()
    )
