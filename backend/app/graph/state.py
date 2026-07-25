from typing import TypedDict, List, Dict, Any, Optional

class AuditState(TypedDict):
    document_text: str
    financial_result: Optional[Dict[str, Any]]
    legal_result: Optional[Dict[str, Any]]
    market_result: Optional[Dict[str, Any]]
    security_result: Optional[Dict[str, Any]]
    coordinator_result: Optional[Dict[str, Any]]
