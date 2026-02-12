import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { ConsultantStateService } from '../../services/consultant-state.service';
import { ConsultantApiService } from '../../services/consultant-api.service';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent {

  loading = false;

  constructor(
    private state: ConsultantStateService,
    private api: ConsultantApiService,
    private router: Router
  ) {}

  analyzeCareer(): void {

    const data = this.state.getConsultantData();

    /* ===============================
       VALIDATION
    =============================== */
    if (!data.skills || data.skills.length === 0) {
      alert('Please select at least one skill for better accuracy.');
      return;
    }

    if (!data.interests || data.interests.length === 0) {
      alert('Please select at least one interest.');
      return;
    }

    this.loading = true;

    /* ===============================
       AI API CALL (UPDATED FORMAT)
    =============================== */
    this.api.analyzeCareer(data).subscribe({
      next: (response: any) => {

        // 🔑 Store structured data from backend
        // response = { success: true, data: {...} }
        this.state.setResult(response.data);

        this.loading = false;

        // Navigate to result page
        this.router.navigate(['/consultant/result']);
      },
      error: (error) => {
        console.error('AI Analysis Error:', error);
        alert('Something went wrong while analyzing your career.');
        this.loading = false;
      }
    });
  }

  back(): void {
    this.router.navigate(['/consultant/constraints']);
  }
}
