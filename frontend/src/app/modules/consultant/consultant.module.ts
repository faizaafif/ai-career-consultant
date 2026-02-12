import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ConsultantRoutingModule } from './consultant-routing.module';

import { WelcomeComponent } from './pages/welcome/welcome.component';
import { BackgroundComponent } from './pages/background/background.component';
import { SkillsComponent } from './pages/skills/skills.component';
import { InterestsComponent } from './pages/interests/interests.component';
import { PersonalityComponent } from './pages/personality/personality.component';
import { ConstraintsComponent } from './pages/constraints/constraints.component';
import { ReviewComponent } from './pages/review/review.component';
import { ResultComponent } from './pages/result/result.component';

@NgModule({

  imports: [
    CommonModule,
    ReactiveFormsModule,
    ConsultantRoutingModule
  ]
})
export class ConsultantModule {}
