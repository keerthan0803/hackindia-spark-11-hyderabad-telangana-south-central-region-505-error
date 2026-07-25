from datetime import datetime
from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError

class AppException(Exception):
    def __init__(self, message: str, status_code: int = 400, error_type: str = "AppException"):
        self.message = message
        self.status_code = status_code
        self.error_type = error_type
        super().__init__(message)

async def app_exception_handler(request: Request, exc: AppException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "error": exc.error_type,
            "message": exc.message,
            "status_code": exc.status_code,
            "timestamp": datetime.utcnow().isoformat()
        }
    )

async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "error": "HTTPException",
            "message": str(exc.detail),
            "status_code": exc.status_code,
            "timestamp": datetime.utcnow().isoformat()
        }
    )

async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=422,
        content={
            "success": False,
            "error": "ValidationError",
            "message": "Input validation failed",
            "details": exc.errors(),
            "status_code": 422,
            "timestamp": datetime.utcnow().isoformat()
        }
    )
