from pydantic import BaseModel
from typing import List, Optional, Dict

class ConsultantRequest(BaseModel):
    background: Optional[Dict]
    skills: Optional[List[str]]
    interests: Optional[List[str]]
    personality: Optional[Dict]
    constraints: Optional[Dict]
