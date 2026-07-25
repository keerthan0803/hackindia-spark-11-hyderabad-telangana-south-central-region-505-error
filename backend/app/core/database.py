from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from app.core.config import settings
from app.core.logging import logger

class DatabaseManager:
    client: AsyncIOMotorClient = None
    db: AsyncIOMotorDatabase = None

db_manager = DatabaseManager()

async def connect_to_mongo():
    logger.info(f"Connecting to MongoDB Atlas database '{settings.DATABASE_NAME}'...")
    db_manager.client = AsyncIOMotorClient(settings.MONGODB_URL)
    db_manager.db = db_manager.client[settings.DATABASE_NAME]
    
    # Ping server
    await db_manager.db.command("ping")
    logger.info("Successfully connected to MongoDB Atlas.")
    
    # Create indexes for all 9 collections
    await init_indexes(db_manager.db)

async def close_mongo_connection():
    if db_manager.client:
        logger.info("Closing MongoDB Atlas connection...")
        db_manager.client.close()

async def init_indexes(db: AsyncIOMotorDatabase):
    """Build Indexes across all 9 collections."""
    try:
        await db.users.create_index("email", unique=True)
        await db.users.create_index("organizationId")
        await db.organizations.create_index("organizationName")
        await db.audits.create_index([("userId", 1), ("status", 1)])
        await db.audits.create_index("createdAt")
        await db.documents.create_index("auditId")
        await db.agent_results.create_index([("auditId", 1), ("agentName", 1)])
        await db.reports.create_index("auditId")
        await db.notifications.create_index([("userId", 1), ("isRead", 1)])
        await db.activity_logs.create_index([("auditId", 1), ("timestamp", -1)])
        await db.settings.create_index("userId", unique=True)
        logger.info("Database indexes successfully verified.")
    except Exception as e:
        logger.error(f"Error creating indexes: {e}")

def get_database() -> AsyncIOMotorDatabase:
    return db_manager.db
