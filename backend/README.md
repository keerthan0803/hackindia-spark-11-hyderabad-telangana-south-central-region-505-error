# Adversarial Corporate Auditor - Enterprise Backend API

Production-grade multi-agent corporate audit backend built with FastAPI, LangGraph, Ollama (Qwen2.5:7B), PyMuPDF, and MongoDB Atlas.

## Architecture Highlights
- **Layered Clean Architecture**: Routes -> Services -> Models & Database.
- **Async Execution**: Powered by Motor and asyncio for parallel agent processing.
- **MongoDB Atlas Integration**: 9 Collections with automatic index generation (`users`, `organizations`, `audits`, `documents`, `agent_results`, `reports`, `notifications`, `activity_logs`, `settings`).
- **Standardized API Responses**: All responses follow `{ "success": true/false, "message": "...", "data": {}, "timestamp": "..." }`.

## Running the Server
```bash
cd backend
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```
Interactive API Documentation: [http://localhost:8000/docs](http://localhost:8000/docs)
