from datetime import datetime
from fastapi import APIRouter, HTTPException
from app.schemas.response import APIResponse
from app.core.database import get_database

router = APIRouter(prefix="/reports", tags=["Executive Reports"])

@router.get("", response_model=APIResponse)
async def list_reports():
    db = get_database()
    cursor = db.reports.find().sort("generatedAt", -1).limit(50)
    reports = []
    async for doc in cursor:
        doc["id"] = str(doc["_id"])
        del doc["_id"]
        reports.append(doc)
    return APIResponse(
        success=True,
        message="Executive reports retrieved",
        data={"reports": reports},
        timestamp=datetime.utcnow().isoformat()
    )
