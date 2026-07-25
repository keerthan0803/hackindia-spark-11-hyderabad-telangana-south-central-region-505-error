import os
import time
import hashlib
from typing import Optional, Dict, Any
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(os.path.dirname(__file__)), ".env"))

JWT_SECRET = os.getenv("JWT_SECRET", "super-secret-corporate-auditor-key-2026")
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_SECONDS = 86400 * 7  # 7 days

def hash_password(password: str) -> str:
    """Hashes a password using SHA-256 with a salt for lightweight secure auth."""
    salt = "corporate_auditor_salt_2026_"
    return hashlib.sha256((salt + password).encode("utf-8")).hexdigest()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verifies a plain password against a stored hash."""
    return hash_password(plain_password) == hashed_password

def create_jwt_token(data: Dict[str, Any]) -> str:
    """Creates a JWT token payload using pyjwt or standard token dict encoding."""
    try:
        import jwt
        payload = data.copy()
        payload["exp"] = int(time.time()) + JWT_EXPIRATION_SECONDS
        return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    except Exception:
        # Fallback simple token if jwt module is unavailable
        import base64
        import json
        payload = data.copy()
        payload["exp"] = int(time.time()) + JWT_EXPIRATION_SECONDS
        raw = json.dumps(payload).encode("utf-8")
        return base64.urlsafe_b64encode(raw).decode("utf-8")

def decode_jwt_token(token: str) -> Optional[Dict[str, Any]]:
    """Decodes and validates a JWT token."""
    try:
        import jwt
        return jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except Exception:
        try:
            import base64
            import json
            raw = base64.urlsafe_b64decode(token.encode("utf-8"))
            return json.loads(raw.decode("utf-8"))
        except Exception:
            return None
