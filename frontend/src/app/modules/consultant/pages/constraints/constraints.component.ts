import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ConsultantStateService } from '../../services/consultant-state.service';

@Component({
  selector: 'app-constraints',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './constraints.component.html',
  styleUrls: ['./constraints.component.css']
})
export class ConstraintsComponent implements OnInit {

  constraintsForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private state: ConsultantStateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.constraintsForm = this.fb.group({
      locationPreference: ['', Validators.required],
      higherStudies: ['', Validators.required],
      financialPressure: ['', Validators.required]
    });
  }

  /**
   * Save constraints and move to review step
   */
  next(): void {
    if (this.constraintsForm.invalid) {
      this.constraintsForm.markAllAsTouched();
      return;
    }

    this.state.setConstraints(this.constraintsForm.value);
    this.router.navigate(['/consultant/review']);
  }

  /**
   * Go back to personality step
   */
  back(): void {
    this.router.navigate(['/consultant/personality']);
  }
}
