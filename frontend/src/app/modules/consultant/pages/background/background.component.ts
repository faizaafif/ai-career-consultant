import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ConsultantStateService } from '../../services/consultant-state.service';

@Component({
  selector: 'app-background',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css']
})
export class BackgroundComponent implements OnInit {

  backgroundForm!: FormGroup;

  fieldOfStudyOptions: string[] = [
    'Computer Science',
    'Product Design',
    'Mechanical Engineering',
    'Electrical Engineering',
    'Business Administration',
    'Marketing',
    'Journalism',
    'Graphic Design',
    'Healthcare Management',
    'Data Science'
  ];

  constructor(
    private fb: FormBuilder,
    private state: ConsultantStateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.backgroundForm = this.fb.group({
      educationLevel: ['', Validators.required],
      fieldOfStudy: ['', Validators.required],
      experience: ['', Validators.required]
    });
  }

  /**
   * Save background info and move to next step
   */
  next(): void {
    if (this.backgroundForm.invalid) {
      this.backgroundForm.markAllAsTouched();
      return;
    }

    this.state.setBackground(this.backgroundForm.value);
    this.router.navigate(['/consultant/skills']);
  }

  /**
   * Return to welcome page
   */
  back(): void {
    this.router.navigate(['/consultant']);
  }
}
