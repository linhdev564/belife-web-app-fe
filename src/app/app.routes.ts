import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () =>
          import('./features/home/home.component').then(m => m.HomeComponent),
        canActivate: [AuthGuard]
      },
            {
        path: 'fitness-package',
        loadComponent: () =>
          import('./features/fitness-package/fitness-package.component').then(m => m.FitnessPackageComponent),
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/login.component').then(m => m.LoginComponent)
  }
];
