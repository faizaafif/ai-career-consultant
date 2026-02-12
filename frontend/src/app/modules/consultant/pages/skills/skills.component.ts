import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { ConsultantStateService } from '../../services/consultant-state.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  skillsForm!: FormGroup;

  availableSkills: string[] = [
    'Java',
    'Python',
    'JavaScript',
    'Angular',
    'SQL',
    'Data Structures',
    'Machine Learning',
    'Cloud Basics'
  ];

  proficiencyLevels: string[] = [
    'Beginner',
    'Intermediate',
    'Advanced'
  ];

  constructor(
    private fb: FormBuilder,
    private state: ConsultantStateService,
    private router: Router
  ) {}

  private skillMap: { [key: string]: string[] } = {
    'Product Design': [
      'Proficiency in design tools (Figma, Sketch, Adobe XD)',
      'User Experience (UX) design',
      'User Interface (UI) design',
      'User research',
      'Prototyping',
      'Interaction design',
      'Wireframing',
      'Usability Testing'
    ],
    'Computer Science': [
      'Programming (Java, Python, C++)',
      'Data Structures and Algorithms',
      'Operating Systems',
      'Database Management',
      'Networking',
      'Software Engineering Principles'
    ],
    'Mechanical Engineering': [
      'CAD Software (SolidWorks, AutoCAD)',
      'Thermodynamics',
      'Fluid Mechanics',
      'Materials Science',
      'Finite Element Analysis (FEA)',
      'Product Development'
    ],
    'Electrical Engineering': [
      'Circuit Design',
      'Power Systems',
      'Electromagnetism',
      'Signal Processing',
      'Control Systems',
      'Embedded Systems'
    ],
    'Business Administration': [
      'Strategic Planning',
      'Financial Management',
      'Marketing Principles',
      'Human Resources',
      'Operations Management',
      'Project Management'
    ],
    'Marketing': [
      'Digital Marketing',
      'Market Research',
      'Branding',
      'Content Creation',
      'SEO/SEM',
      'Social Media Marketing'
    ],
    'Journalism': [
      'Investigative Reporting',
      'News Writing',
      'Interviewing Skills',
      'Media Ethics',
      'Digital Storytelling',
      'Broadcast Production'
    ],
    'Graphic Design': [
      'Adobe Creative Suite (Photoshop, Illustrator, InDesign)',
      'Typography',
      'Layout Design',
      'Branding',
      'Web Design Principles',
      'Print Production'
    ],
    'Healthcare Management': [
      'Healthcare Policy',
      'Hospital Administration',
      'Patient Care Coordination',
      'Medical Ethics',
      'Health Information Systems',
      'Regulatory Compliance'
    ],
    'Data Science': [
      'Statistical Analysis',
      'Machine Learning',
      'Data Visualization',
      'Python (Pandas, NumPy, Scikit-learn)',
      'R Programming',
      'Big Data Technologies (Hadoop, Spark)'
    ],
  };

  ngOnInit(): void {
    const background = this.state.getBackground();
    const fieldOfStudy = background?.fieldOfStudy;

    if (fieldOfStudy && this.skillMap[fieldOfStudy]) {
      this.availableSkills = this.skillMap[fieldOfStudy];
    } else {
      // Default skills if field of study not found or not provided
      this.availableSkills = [
        'Java',
        'Python',
        'JavaScript',
        'Angular',
        'SQL',
        'Data Structures',
        'Machine Learning',
        'Cloud Basics'
      ];
    }

    this.skillsForm = this.fb.group({
      skills: this.fb.array([])
    });
  }

  /* ===============================
     FORM HELPERS
     =============================== */

  get skillsArray(): FormArray {
    return this.skillsForm.get('skills') as FormArray;
  }

  isSkillSelected(skill: string): boolean {
    return this.skillsArray.controls.some(
      ctrl => ctrl.value.name === skill
    );
  }

  /* ===============================
     SKILL TOGGLE LOGIC
     =============================== */

  toggleSkill(skill: string): void {
    const index = this.skillsArray.controls.findIndex(
      ctrl => ctrl.value.name === skill
    );

    if (index !== -1) {
      this.skillsArray.removeAt(index);
    } else {
      this.skillsArray.push(
        this.fb.group({
          name: [skill],
          level: ['', Validators.required]
        })
      );
    }
  }

  /* ===============================
     NAVIGATION
     =============================== */

  next(): void {
    if (this.skillsArray.length === 0) {
      alert('Please select at least one skill.');
      return;
    }

    if (this.skillsForm.invalid) {
      this.skillsForm.markAllAsTouched();
      return;
    }

    const skillsData = this.skillsArray.value.map((s: any) => ({
      name: s.name,
      level: s.level
    }));

    this.state.setSkills(skillsData);
    this.router.navigate(['/consultant/interests']);
  }

  back(): void {
    this.router.navigate(['/consultant/background']);
  }
}
