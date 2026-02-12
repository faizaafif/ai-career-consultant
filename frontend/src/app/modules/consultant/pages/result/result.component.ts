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

  resultData: any = null;
  loading = true;

  constructor(
    private state: ConsultantStateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const result = this.state.getResult();

    if (result) {
      this.resultData = result;
      this.loading = false;
    }
  }

  restart(): void {
    this.state.reset();
    this.router.navigate(['/consultant']);
  }
}
