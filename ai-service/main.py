from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import logging

import torch
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

# ===============================
# LOGGING CONFIG
# ===============================
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

# ===============================
# LOAD MODEL CORRECTLY
# ===============================
logging.info("Loading FLAN-T5 model...")

MODEL_NAME = "google/flan-t5-large"

tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_NAME)

logging.info("Model loaded successfully")

app = FastAPI()

# ===============================
# CORS CONFIG
# ===============================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===============================
# REQUEST SCHEMA
# ===============================
class ConsultantData(BaseModel):
    background: dict | None = None
    skills: list | None = None
    interests: list | None = None
    personality: dict | None = None
    constraints: dict | None = None

# ===============================
# TEXT GENERATION FUNCTION
# ===============================
def generate_text(prompt: str, max_tokens=256) -> str:
    inputs = tokenizer(prompt, return_tensors="pt", truncation=True)

    with torch.no_grad():
        outputs = model.generate(
            **inputs,
            max_new_tokens=max_tokens,
            temperature=0.7,
            do_sample=True
        )

    return tokenizer.decode(outputs[0], skip_special_tokens=True)

# ===============================
# AI ANALYSIS ENDPOINT
# ===============================
@app.post("/analyze")
def analyze(data: ConsultantData):

    profile = {
        "background": data.background,
        "skills": data.skills,
        "interests": data.interests,
        "personality": data.personality,
        "constraints": data.constraints
    }

    logging.info("📥 PROFILE RECEIVED")
    logging.info(profile)

    # ===============================
    # STEP 1: CAREER OPTIONS
    # ===============================
    step1_prompt = f"""
You are a professional career consultant.

Given the student profile below, list 2–3 suitable career paths.

Student Profile:
{profile}

Only list the career names.
"""
    career_options = generate_text(step1_prompt)
    logging.info("Career options:")
    logging.info(career_options)

    # ===============================
    # STEP 2: FEASIBILITY CHECK
    # ===============================
    step2_prompt = f"""
Student Profile:
{profile}

Career Options:
{career_options}

Considering constraints, which ONE career is most feasible?
Explain briefly.
"""
    feasibility = generate_text(step2_prompt)
    logging.info("🧠 Feasibility reasoning:")
    logging.info(feasibility)

    # ===============================
    # STEP 3: ACTION PLAN
    # ===============================
    step3_prompt = f"""
Based on the chosen career below, give clear next steps.

Career Decision:
{feasibility}

Be practical and realistic.
"""
    next_steps = generate_text(step3_prompt)
    logging.info("🧠 Next steps:")
    logging.info(next_steps)

    # ===============================
    # FINAL RESPONSE
    # ===============================
    final_result = f"""
Best Career Recommendation:
{feasibility}

Next Steps:
{next_steps}
"""

    return {"analysis": final_result}
