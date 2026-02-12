import os
import json
from dotenv import load_dotenv
from google import genai
from schemas.consultant_schema import ConsultantRequest

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")
MODEL_NAME = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")

client = genai.Client(api_key=API_KEY)


SYSTEM_PROMPT = """
You are an experienced human career consultant.
Analyze the student profile realistically.
Reject unrealistic options.
Recommend feasible career paths.
Return ONLY valid JSON in this exact structure:

{
  "topCareers": [
    {
      "title": "",
      "confidence": 0.0,
      "reasoning": "",
      "learningRoadmap": []
    }
  ],
  "alternatives": [],
  "rejectedOptions": [
    {
      "career": "",
      "reason": ""
    }
  ]
}
"""


def build_prompt(profile: ConsultantRequest) -> str:
    return f"""
Student Profile:

Education: {profile.educationLevel}
Stream: {profile.stream}
Status: {profile.status}

Skills:
{[{"name": s.name, "level": s.level} for s in profile.skills]}

Interests:
{profile.interests}

Constraints:
{profile.constraints}

Analyze and return structured JSON only.
"""


def analyze_profile(profile: ConsultantRequest):
    prompt = build_prompt(profile)

    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=SYSTEM_PROMPT + "\n\n" + prompt,
        config={
            "temperature": 0.4,
            "max_output_tokens": 1024,
            "response_mime_type": "application/json"
        }
    )

    try:
        return json.loads(response.text)
    except Exception:
        raise ValueError("Gemini returned invalid JSON")
