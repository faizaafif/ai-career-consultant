from fastapi import FastAPI, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

from schemas.consultant_schema import (
    ConsultantRequest,
    ConsultantResponse,
    ChatRequest,
    ChatResponse,
)
from services.gemini_ai_service import analyze_profile, chat_with_consultant

# ✅ CREATE APP FIRST
app = FastAPI(title="AI Career Consultant - Gemini")

# ✅ THEN REGISTER EXCEPTION HANDLER
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

# ✅ THEN DEFINE ROUTES
@app.post("/analyze", response_model=ConsultantResponse)
def analyze(request: ConsultantRequest):
    result = analyze_profile(request)
    normalized = normalize_response(result)
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
        return ChatResponse(reply=reply)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))

