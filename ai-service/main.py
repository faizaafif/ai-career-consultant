from fastapi import FastAPI, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

from schemas.consultant_schema import (
    ConsultantRequest,
    ConsultantResponse
)
from services.gemini_ai_service import analyze_profile

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

