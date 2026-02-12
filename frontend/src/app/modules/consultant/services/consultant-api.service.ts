import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CareerAnalysisResponse {
  result: {
    analysis: string;
  };
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
}
