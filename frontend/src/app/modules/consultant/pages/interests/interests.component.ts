import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { ConsultantStateService } from '../../services/consultant-state.service';

@Component({
  selector: 'app-interests',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.css']
})
export class InterestsComponent implements OnInit {

  interestsForm!: FormGroup;

  // Predefined interest areas (consultant-curated)
  interestOptions: string[] = [];

  private interestMap: { [key: string]: string[] } = {
    'Computer Science': [
      'Building software applications',
      'Analyzing data and finding insights',
      'Working with algorithms and data structures',
      'Cybersecurity and network defense',
      'Artificial Intelligence and Machine Learning',
      'Cloud computing and infrastructure',
      'Game development'
    ],
    'Product Design': [
      'User research and understanding user needs',
      'Creating intuitive and aesthetically pleasing interfaces',
      'Prototyping and testing design solutions',
      'Solving complex problems with design thinking',
      'Visual communication and branding',
      'Interaction design and user flows'
    ],
    'Mechanical Engineering': [
      'Designing and analyzing mechanical systems',
      'Robotics and automation',
      'Thermodynamics and energy systems',
      'Manufacturing processes and materials science',
      'Automotive and aerospace engineering',
      'CAD/CAM and simulation tools'
    ],
    'Electrical Engineering': [
      'Designing and testing electronic circuits',
      'Power generation and distribution',
      'Telecommunications and signal processing',
      'Embedded systems and microcontrollers',
      'Renewable energy technologies',
      'Robotics and control systems'
    ],
    'Business Administration': [
      'Strategic planning and business development',
      'Financial management and investment',
      'Marketing and brand management',
      'Human resource management and organizational behavior',
      'Operations and supply chain management',
      'Entrepreneurship and innovation'
    ],
    'Marketing': [
      'Digital marketing strategies (SEO, SEM, social media)',
      'Market research and consumer behavior',
      'Brand development and advertising campaigns',
      'Content creation and storytelling',
      'Public relations and communications',
      'Sales and customer relationship management'
    ],
    'Journalism': [
      'Investigative reporting and uncovering stories',
      'Writing and editing news articles',
      'Interviewing and conducting research',
      'Multimedia storytelling (video, audio, photography)',
      'Ethical reporting and media law',
      'Current events and public affairs'
    ],
    'Graphic Design': [
      'Creating visual concepts and layouts',
      'Using design software (Adobe Creative Suite)',
      'Branding and identity design',
      'Typography and illustration',
      'Web and mobile UI design',
      'Print and editorial design'
    ],
    'Healthcare Management': [
      'Healthcare policy and administration',
      'Improving patient care and outcomes',
      'Managing healthcare facilities and operations',
      'Public health initiatives',
      'Health information systems',
      'Ethical considerations in healthcare'
    ],
    'Data Science': [
      'Analyzing large datasets to extract insights',
      'Building predictive models and machine learning algorithms',
      'Data visualization and storytelling',
      'Statistical analysis and hypothesis testing',
      'Programming in Python/R for data analysis',
      'Big data technologies (Hadoop, Spark)'
    ],
    // Default interests if field of study is not found or provided
    'default': [
      'Building software applications',
      'Analyzing data and finding insights',
      'Designing user interfaces',
      'Working with hardware or systems',
      'Teaching or mentoring others',
      'Research and experimentation',
      'Business and decision making'
    ]
  };

  constructor(
    private fb: FormBuilder,
    private state: ConsultantStateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const background = this.state.getBackground();
    const fieldOfStudy = background?.fieldOfStudy;

    if (fieldOfStudy && this.interestMap[fieldOfStudy]) {
      this.interestOptions = this.interestMap[fieldOfStudy];
    } else {
      this.interestOptions = this.interestMap['default'];
    }

    this.interestsForm = this.fb.group({
      interests: [[]]
    });
  }

  /**
   * Toggle interest selection (multi-select)
   */
  toggleInterest(interest: string): void {
    const selected: string[] = this.interestsForm.value.interests;

    if (selected.includes(interest)) {
      this.interestsForm.patchValue({
        interests: selected.filter(i => i !== interest)
      });
    } else {
      this.interestsForm.patchValue({
        interests: [...selected, interest]
      });
    }
  }

  /**
   * Validate and proceed to personality step
   */
  next(): void {
    const selectedInterests = this.interestsForm.value.interests;

    if (!selectedInterests || selectedInterests.length === 0) {
      alert('Please select at least one interest.');
      return;
    }

    this.state.setInterests(selectedInterests);
    this.router.navigate(['/consultant/personality']);
  }

  /**
   * Go back to skills step
   */
  back(): void {
    this.router.navigate(['/consultant/skills']);
  }
}
