import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { ConsultantStateService } from '../../services/consultant-state.service';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  analysisText: string | null = null;
  confidenceLabel = '';

  constructor(
    private state: ConsultantStateService,
    private router: Router   // 🔑 REQUIRED
  ) {}

  ngOnInit(): void {
    const result = this.state.getResult();

    if (result) {
      this.analysisText = result;
      this.confidenceLabel = this.calculateConfidence(result);
    }
  }

  private calculateConfidence(text: string): string {
    return text.includes('Best Career Recommendation')
      ? 'High Confidence Match'
      : 'Moderate Confidence Match';
  }

  /**
   * 🔁 Restart consultation properly
   */
  restart(): void {
    this.state.reset();                    // clear old data
    this.router.navigate(['/consultant']); // 🔑 navigate to welcome
  }
}
