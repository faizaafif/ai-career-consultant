import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { ConsultantStateService } from '../../services/consultant-state.service';

@Component({
  selector: 'app-personality',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './personality.component.html',
  styleUrls: ['./personality.component.css']
})
export class PersonalityComponent implements OnInit {

  personalityForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private state: ConsultantStateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.personalityForm = this.fb.group({
      workStyle: ['', Validators.required],
      riskTolerance: ['', Validators.required],
      problemApproach: ['', Validators.required]
    });
  }

  /**
   * Save personality data and move to constraints step
   */
  next(): void {
    if (this.personalityForm.invalid) {
      this.personalityForm.markAllAsTouched();
      return;
    }

    this.state.setPersonality(this.personalityForm.value);
    this.router.navigate(['/consultant/constraints']);
  }

  /**
   * Navigate back to interests step
   */
  back(): void {
    this.router.navigate(['/consultant/interests']);
  }
}
