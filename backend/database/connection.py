import os
import logging
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import MongoClient

# Load environment variables
dotenv_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), ".env")
load_dotenv(dotenv_path)

MONGODB_URL = os.getenv(
    "MONGODB_URL",
    "mongodb+srv://23eg106b48_db_user:hxcNO7ySyXWsFjz2@cluster0.ei3dc6b.mongodb.net/CorporateAuditorDB?retryWrites=true&w=majority"
)
DATABASE_NAME = os.getenv("DATABASE_NAME", "CorporateAuditorDB")

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("CorporateAuditorDB")

# Async Motor Client for FastAPI async routes
client: AsyncIOMotorClient = AsyncIOMotorClient(MONGODB_URL)
db = client[DATABASE_NAME]

def get_database():
    """Returns the async Motor MongoDB database instance."""
    return db

def get_sync_database():
    """Returns a synchronous PyMongo database instance for background tasks or scripts."""
    sync_client = MongoClient(MONGODB_URL)
    return sync_client[DATABASE_NAME]

async def init_db():
    """
    Initializes database indexes and verifies connectivity to MongoDB Atlas.
    """
    try:
        logger.info(f"Connecting to MongoDB Atlas at database '{DATABASE_NAME}'...")
        
        # Ping server to confirm connection
        await client.admin.command('ping')
        logger.info("Successfully connected to MongoDB Atlas!")

        # 1. users Collection Indexes
        await db.users.create_index("email", unique=True)
        await db.users.create_index("organizationId")

        # 2. organizations Collection Indexes
        await db.organizations.create_index("organizationName")

        # 3. audits Collection Indexes
        await db.audits.create_index([("userId", 1), ("status", 1)])
        await db.audits.create_index("createdAt")
        await db.audits.create_index("overallSeverity")

        # 4. documents Collection Indexes
        await db.documents.create_index("auditId")

        # 5. agent_results Collection Indexes
        await db.agent_results.create_index([("auditId", 1), ("agentName", 1)])

        # 6. reports Collection Indexes
        await db.reports.create_index("auditId")

        # 7. notifications Collection Indexes
        await db.notifications.create_index([("userId", 1), ("isRead", 1)])

        # 8. activity_logs Collection Indexes
        await db.activity_logs.create_index([("auditId", 1), ("timestamp", -1)])

        # 9. settings Collection Indexes
        await db.settings.create_index("userId", unique=True)

        logger.info("MongoDB database indexes successfully initialized.")
        return True

    except Exception as e:
        logger.error(f"Error initializing MongoDB database: {e}")
        return False
