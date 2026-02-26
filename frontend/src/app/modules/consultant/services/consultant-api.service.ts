import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CareerAnalysisResponse {
  result: {
    analysis: string;
  };
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  profile: any;
  analysisResult: any;
  messages: ChatMessage[];
}

export interface ChatResponse {
  reply: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConsultantApiService {

  private API_URL = 'http://localhost:5000/api/consultant';

  constructor(private http: HttpClient) {}

  analyzeCareer(data: any): Observable<CareerAnalysisResponse> {
    return this.http.post<CareerAnalysisResponse>(`${this.API_URL}/analyze`, data);
  }

  chat(payload: ChatRequest): Observable<{ success: boolean; data: ChatResponse }> {
    return this.http.post<{ success: boolean; data: ChatResponse }>(
      `${this.API_URL}/chat`,
      payload
    );
  }
}
