import asyncio
import os
import sys

# Ensure backend root is in sys.path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database.connection import init_db, db

async def test_connection():
    print("Testing MongoDB Atlas connection...")
    success = await init_db()
    if success:
        print("SUCCESS: MongoDB Connected and Indexes Initialized!")
        collections = await db.list_collection_names()
        print(f"Collections in {db.name}: {collections}")
    else:
        print("FAILED: Could not connect to MongoDB Atlas.")

if __name__ == "__main__":
    asyncio.run(test_connection())
