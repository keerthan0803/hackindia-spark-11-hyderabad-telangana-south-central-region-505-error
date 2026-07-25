from typing import Generic, TypeVar, Optional, Any
from datetime import datetime
from pydantic import BaseModel, Field

T = TypeVar("T")

class APIResponse(BaseModel, Generic[T]):
    success: bool = True
    message: str = "Operation completed successfully"
    data: Optional[T] = None
    timestamp: str = Field(default_factory=lambda: datetime.utcnow().isoformat())

class APIErrorResponse(BaseModel):
    success: bool = False
    error: str = "Error"
    message: str
    status_code: int = 400
    timestamp: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
