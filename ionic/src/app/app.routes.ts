import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./page/home/home.component').then((m) => m.HomeComponent),
    pathMatch: 'full',
  },
  {
    path: 'device',
    loadComponent: () =>
      import('./page/device/device.component').then((m) => m.DeviceComponent),
  },
  {
    path: 'measurement',
    loadComponent: () =>
      import('./page/measurement/measurement.component').then((m) => m.MeasurementComponent),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./page/profile/profile.component').then((m) => m.ProfileComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./page/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
