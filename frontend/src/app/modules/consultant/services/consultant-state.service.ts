import { Injectable } from '@angular/core';

/* ===============================
   DATA MODELS (Strong Typing)
   =============================== */

export interface BackgroundInfo {
  educationLevel: string;
  fieldOfStudy: string;
  experience: string;
}

export interface PersonalityInfo {
  workStyle: string;
  riskLevel: string;
}

export interface ConstraintInfo {
  locationPreference: string;
  higherStudies: string;
}

export interface ConsultantData {
  background?: BackgroundInfo;
  skills?: string[];
  interests?: string[];
  personality?: PersonalityInfo;
  constraints?: ConstraintInfo;
}

/* ===============================
   STATE SERVICE
   =============================== */

@Injectable({
  providedIn: 'root'
})
export class ConsultantStateService {

  /* ----------- Core Consultation Data ----------- */
  private data: ConsultantData = {};

  /* ----------- AI Result ----------- */
  private result!: string;

  /* ===============================
     SETTERS (Save user answers)
     =============================== */

  setBackground(background: BackgroundInfo): void {
    this.data.background = background;
  }

  setSkills(skills: string[]): void {
    this.data.skills = skills;
  }

  setInterests(interests: string[]): void {
    this.data.interests = interests;
  }

  setPersonality(personality: PersonalityInfo): void {
    this.data.personality = personality;
  }

  setConstraints(constraints: ConstraintInfo): void {
    this.data.constraints = constraints;
  }

  /* ===============================
     GETTERS (Read consultation data)
     =============================== */

  getConsultantData(): ConsultantData {
    return this.data;
  }

  getBackground(): BackgroundInfo | undefined {
    return this.data.background;
  }


  /* ===============================
     AI RESULT STORAGE
     =============================== */

  setResult(result: any): void {
    this.result = result;
  }

  getResult(): string {
    return this.result;
  }

  /* ===============================
     RESET (Start fresh consultation)
     =============================== */

  reset(): void {
    this.data = {};
    this.result = '';
  }
}
