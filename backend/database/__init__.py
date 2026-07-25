"""
Database package for Corporate Auditor AI backend.
"""
from .connection import get_database, init_db, db, client

__all__ = ["get_database", "init_db", "db", "client"]
