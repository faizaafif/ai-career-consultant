import os
import json
from dotenv import load_dotenv
from google import genai
from schemas.consultant_schema import ConsultantRequest, ChatRequest

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


CHAT_SYSTEM_PROMPT = """
You are an experienced, friendly career consultant.
You will be given:
- The student's profile data
- A structured career analysis that was previously generated
- A chat history between you and the student

Your job:
- Answer the student's follow-up questions clearly and concisely.
- Use the profile and analysis result as primary context.
- If you don't know something, say so honestly instead of making things up.
- Keep answers practical and actionable for a student.
- Give reply in plain text(No bold/italic/underline).
"""


def build_chat_prompt(chat: ChatRequest) -> str:
    profile = chat.profile
    analysis = chat.analysisResult or {}

    profile_block = ""
    if profile:
        profile_block = f"""
Student Profile:
- Education level: {profile.educationLevel}
- Stream: {profile.stream}
- Status: {profile.status}
- Skills: {[{"name": s.name, "level": s.level} for s in profile.skills]}
- Interests: {profile.interests}
- Constraints: {profile.constraints}
"""

    analysis_block = json.dumps(analysis, indent=2, ensure_ascii=False)

    history_lines = []
    for msg in chat.messages:
        prefix = "Student" if msg.role == "user" else "Consultant"
        history_lines.append(f"{prefix}: {msg.content}")

    history_block = "\n".join(history_lines)

    return f"""{profile_block}

Previous Analysis (JSON):
{analysis_block}

Conversation so far:
{history_block}

Now provide the best next reply as the career consultant.
"""


def chat_with_consultant(chat: ChatRequest) -> str:
    prompt = build_chat_prompt(chat)

    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=CHAT_SYSTEM_PROMPT + "\n\n" + prompt,
        config={
            "temperature": 0.5,
            "max_output_tokens": 1024,
        },
    )

    # google-genai python client exposes text on the response
    return response.text.strip()
