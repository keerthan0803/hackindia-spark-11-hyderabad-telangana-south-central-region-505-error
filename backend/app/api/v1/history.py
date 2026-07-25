from datetime import datetime
from fastapi import APIRouter, HTTPException
from app.schemas.response import APIResponse
from app.core.database import get_database

router = APIRouter(prefix="/history", tags=["Audit History"])

@router.get("", response_model=APIResponse)
async def get_audit_history():
    db = get_database()
    cursor = db.audits.find().sort("createdAt", -1).limit(100)
    audits = []
    async for doc in cursor:
        doc["id"] = str(doc["_id"])
        del doc["_id"]
        audits.append(doc)

    return APIResponse(
        success=True,
        message="Audit history logs retrieved",
        data={"audits": audits},
        timestamp=datetime.utcnow().isoformat()
    )

@router.get("/{audit_id}", response_model=APIResponse)
async def get_audit_detail(audit_id: str):
    db = get_database()
    try:
        from bson import ObjectId
        query_id = ObjectId(audit_id) if ObjectId.is_valid(audit_id) else audit_id
    except Exception:
        query_id = audit_id

    audit = await db.audits.find_one({"$or": [{"_id": query_id}, {"_id": audit_id}]})
    if not audit:
        raise HTTPException(status_code=404, detail="Audit record not found.")

    audit["id"] = str(audit["_id"])
    del audit["_id"]

    agent_cursor = db.agent_results.find({"auditId": audit_id})
    agent_results = []
    async for a_doc in agent_cursor:
        a_doc["id"] = str(a_doc["_id"])
        del a_doc["_id"]
        agent_results.append(a_doc)

    report = await db.reports.find_one({"auditId": audit_id})
    if report:
        report["id"] = str(report["_id"])
        del report["_id"]

    return APIResponse(
        success=True,
        message="Audit details retrieved",
        data={"audit": audit, "agent_results": agent_results, "report": report},
        timestamp=datetime.utcnow().isoformat()
    )
