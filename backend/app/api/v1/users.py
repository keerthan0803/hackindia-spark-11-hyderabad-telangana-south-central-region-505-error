from datetime import datetime
from fastapi import APIRouter
from app.schemas.response import APIResponse
from app.core.database import get_database

router = APIRouter(prefix="/users", tags=["User Management"])

@router.get("", response_model=APIResponse)
async def list_users():
    db = get_database()
    cursor = db.users.find({}, {"passwordHash": 0}).limit(50)
    users = []
    async for doc in cursor:
        doc["id"] = str(doc["_id"])
        del doc["_id"]
        users.append(doc)
    return APIResponse(
        success=True,
        message="Users list retrieved",
        data={"users": users},
        timestamp=datetime.utcnow().isoformat()
    )
