from pydantic import BaseModel
from typing import List, Optional


class Skill(BaseModel):
    name: str
    level: str


class ConsultantRequest(BaseModel):
    educationLevel: Optional[str] = None
    stream: Optional[str] = None
    status: Optional[str] = None

    skills: List[Skill] = []

    # Now matches Angular
    interests: Optional[List[str]] = []

    constraints: Optional[dict] = None


class CareerRecommendation(BaseModel):
    title: str
    confidence: float
    reasoning: str
    learningRoadmap: List[str]


class RejectedOption(BaseModel):
    career: str
    reason: str


class ConsultantResponse(BaseModel):
    topCareers: List[CareerRecommendation]
    alternatives: List[CareerRecommendation]
    rejectedOptions: List[RejectedOption]
