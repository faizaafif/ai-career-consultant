import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from './pages/welcome/welcome.component';
import { BackgroundComponent } from './pages/background/background.component';
import { SkillsComponent } from './pages/skills/skills.component';
import { InterestsComponent } from './pages/interests/interests.component';
import { PersonalityComponent } from './pages/personality/personality.component';
import { ConstraintsComponent } from './pages/constraints/constraints.component';
import { ReviewComponent } from './pages/review/review.component';
import { ResultComponent } from './pages/result/result.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'background', component: BackgroundComponent },
  { path: 'skills', component: SkillsComponent },
  { path: 'interests', component: InterestsComponent },
  { path: 'personality', component: PersonalityComponent },
  { path: 'constraints', component: ConstraintsComponent },
  { path: 'review', component: ReviewComponent },
  { path: 'result', component: ResultComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultantRoutingModule {}
