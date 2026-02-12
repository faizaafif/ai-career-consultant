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

# ✅ THEN DEFINE ROUTES
@app.post("/analyze", response_model=ConsultantResponse)
def analyze(request: ConsultantRequest):
    try:
        result = analyze_profile(request)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
