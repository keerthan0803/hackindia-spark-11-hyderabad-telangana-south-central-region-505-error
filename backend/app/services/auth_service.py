from datetime import datetime
from typing import Dict, Any, Optional
from app.core.database import get_database
from app.core.security import hash_password, verify_password, create_access_token
from app.core.exceptions import AppException

class AuthService:
    def __init__(self):
        self.db = get_database()

    async def register_user(self, data: Dict[str, Any]) -> Dict[str, Any]:
        email = data["email"].lower()
        existing = await self.db.users.find_one({"email": email})
        if existing:
            raise AppException("User with this email already exists", status_code=400, error_type="UserAlreadyExists")

        # Create Organization
        org_doc = {
            "organizationName": data.get("organizationName", "Global Audit Systems"),
            "industry": "Financial Services",
            "companySize": "500+",
            "country": "USA",
            "timezone": "UTC",
            "createdAt": datetime.utcnow()
        }
        org_res = await self.db.organizations.insert_one(org_doc)
        org_id = str(org_res.inserted_id)

        # Create User
        user_doc = {
            "fullName": data["fullName"],
            "email": email,
            "passwordHash": hash_password(data["password"]),
            "organizationId": org_id,
            "role": data.get("role", "Senior Auditor"),
            "department": data.get("department", "Risk Intelligence"),
            "avatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuBwTH6SYhfA1dmDcOmneumKUz5B_WPr-Un-I4E6FstmeAGdb4lWYMeTWMrXH8vaKLzZSRb3mR5h7aVQ2UclrQVU1qBzELKemquHLBMcQyUzHOqfKdMA5KMPQiE5xzxVsM5U3ESLqlYf35BFF8PT2Enui7FALAJ4BGYTj1kokOcY4P7yhuLgLhP3P7MHyoZ395JlZMDcKuPsx3dkC0kcifkW4OvGBekQbhh8fu4SHaehA4w2lxSFwDP_IDitxmacSGzLi9QuX-nuQo_9",
            "isVerified": True,
            "lastLogin": datetime.utcnow(),
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        }
        user_res = await self.db.users.insert_one(user_doc)
        user_id = str(user_res.inserted_id)

        # Default Settings
        await self.db.settings.insert_one({
            "userId": user_id,
            "selectedModel": "qwen2.5:7b",
            "temperature": 0.7,
            "maxTokens": 4096,
            "parallelExecution": True,
            "notifications": True,
            "exportFormat": "PDF",
            "theme": "Light",
            "updatedAt": datetime.utcnow()
        })

        token = create_access_token({"user_id": user_id, "email": email, "role": user_doc["role"]})

        return {
            "token": token,
            "user": {
                "id": user_id,
                "fullName": data["fullName"],
                "email": email,
                "organizationId": org_id,
                "role": user_doc["role"],
                "department": user_doc["department"]
            }
        }

    async def login_user(self, email: str, password: str) -> Dict[str, Any]:
        email = email.lower()
        user = await self.db.users.find_one({"email": email})
        if not user or not verify_password(password, user["passwordHash"]):
            raise AppException("Invalid email or password", status_code=401, error_type="AuthenticationError")

        user_id = str(user["_id"])
        await self.db.users.update_one({"_id": user["_id"]}, {"$set": {"lastLogin": datetime.utcnow()}})
        token = create_access_token({"user_id": user_id, "email": email, "role": user.get("role", "Auditor")})

        return {
            "token": token,
            "user": {
                "id": user_id,
                "fullName": user["fullName"],
                "email": email,
                "role": user.get("role", "Auditor"),
                "department": user.get("department", "Risk Intelligence")
            }
        }
