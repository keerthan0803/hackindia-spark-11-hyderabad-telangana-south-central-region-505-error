from datetime import datetime
from typing import Optional
from fastapi import APIRouter
from pydantic import BaseModel
from app.schemas.response import APIResponse
from app.core.database import get_database

router = APIRouter(prefix="/settings", tags=["Settings"])

class SettingsUpdateSchema(BaseModel):
    selectedModel: Optional[str] = "qwen2.5:7b"
    temperature: Optional[float] = 0.7
    maxTokens: Optional[int] = 4096
    parallelExecution: Optional[bool] = True
    notifications: Optional[bool] = True
    exportFormat: Optional[str] = "PDF"
    theme: Optional[str] = "Light"

@router.get("", response_model=APIResponse)
async def get_settings():
    db = get_database()
    setting = await db.settings.find_one()
    if setting:
        setting["id"] = str(setting["_id"])
        del setting["_id"]
    else:
        setting = {
            "selectedModel": "qwen2.5:7b",
            "temperature": 0.7,
            "maxTokens": 4096,
            "parallelExecution": True,
            "notifications": True,
            "exportFormat": "PDF",
            "theme": "Light"
        }
    return APIResponse(
        success=True,
        message="Settings configuration retrieved",
        data=setting,
        timestamp=datetime.utcnow().isoformat()
    )

@router.put("", response_model=APIResponse)
async def update_settings(req: SettingsUpdateSchema):
    db = get_database()
    update_data = req.model_dump(exclude_unset=True)
    update_data["updatedAt"] = datetime.utcnow()
    await db.settings.update_one({}, {"$set": update_data}, upsert=True)
    return APIResponse(
        success=True,
        message="Settings updated successfully",
        data=update_data,
        timestamp=datetime.utcnow().isoformat()
    )
