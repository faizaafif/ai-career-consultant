import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'consultant',
    pathMatch: 'full'
  },
  {
    path: 'consultant',
    loadChildren: () =>
      import('./modules/consultant/consultant-routing.module')
        .then(m => m.ConsultantRoutingModule)
  }
];
