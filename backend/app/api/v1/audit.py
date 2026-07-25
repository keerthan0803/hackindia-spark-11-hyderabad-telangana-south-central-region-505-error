import os
from datetime import datetime
from fastapi import APIRouter, UploadFile, File, HTTPException
from app.schemas.response import APIResponse
from app.services.audit_service import AuditService
from app.core.config import settings

router = APIRouter(prefix="/audit", tags=["Audit Workflow"])

@router.post("/run", response_model=APIResponse)
async def run_audit(file: UploadFile = File(...)):
    if not file.filename.endswith(('.pdf', '.docx', '.xlsx', '.sol', '.py', '.js')):
        raise HTTPException(
            status_code=400,
            detail="Unsupported file format. Please upload PDF, DOCX, XLSX, or Code file."
        )

    os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
    file_path = os.path.join(settings.UPLOAD_DIR, file.filename)

    # Async non-blocking file write
    with open(file_path, "wb") as buffer:
        while chunk := await file.read(1024 * 1024):  # 1MB Chunks
            buffer.write(chunk)

    file_size = os.path.getsize(file_path)
    service = AuditService()
    result = await service.execute_audit(file.filename, file_path, file_size)

    return APIResponse(
        success=True,
        message="Multi-agent adversarial corporate audit executed successfully",
        data=result,
        timestamp=datetime.utcnow().isoformat()
    )
