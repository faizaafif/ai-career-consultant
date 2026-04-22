from fastapi import FastAPI, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
import os
from datetime import datetime
from pymongo import MongoClient

from schemas.consultant_schema import (
    ConsultantRequest,
    ConsultantResponse,
    ChatRequest,
    ChatResponse,
)
from services.gemini_ai_service import analyze_profile, chat_with_consultant

app = FastAPI(title="AI Career Consultant - Gemini")

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
try:
    mongo_client = MongoClient(MONGO_URI)
    db = mongo_client["ai_career"]
    responses_collection = db["gemini_responses"]
except Exception as e:
    print(f"Failed to connect to MongoDB: {e}")
    responses_collection = None

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=422,
        content={"detail": exc.errors()}
    )

def normalize_response(data):
    for section in ["topCareers", "alternatives"]:
        if section in data:
            for item in data[section]:
                if "learningRoadmap" not in item:
                    item["learningRoadmap"] = []
    return data

@app.post("/analyze", response_model=ConsultantResponse)
def analyze(request: ConsultantRequest):
    result = analyze_profile(request)
    normalized = normalize_response(result)
    
    # Store in MongoDB
    if responses_collection is not None:
        try:
            doc = {
                "type": "analyze",
                "request": request.model_dump(),
                "response": normalized,
                "timestamp": datetime.utcnow()
            }
            responses_collection.insert_one(doc)
        except Exception as e:
            print(f"Error saving analyze response to MongoDB: {e}")
            
    return normalized


@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    """
    Lightweight chat endpoint to answer follow-up questions
    based on the student's profile, previous analysis, and
    the ongoing conversation history.
    """
    try:
        reply = chat_with_consultant(request)
        
        # Store in MongoDB
        if responses_collection is not None:
            try:
                doc = {
                    "type": "chat",
                    "request": request.model_dump(),
                    "response": reply,
                    "timestamp": datetime.utcnow()
                }
                responses_collection.insert_one(doc)
            except Exception as e:
                print(f"Error saving chat response to MongoDB: {e}")
                
        return ChatResponse(reply=reply)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))

