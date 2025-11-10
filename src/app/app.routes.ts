import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AuthGuard } from './components/guards/auth.guard';
import { ClientPageComponent } from './components/client-page/components/client-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    pathMatch: 'full',
  },
  {
    path: 'cliente',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/client-page/client-page.module').then(m => m.ClientPageModule),
  },
  // {
  //   path: 'doutor',
  //   component: PatientLayoutComponent,
  //   canActivate: [AuthGuard],
  //   children: [
  //     {
  //       path: 'home',
  //       component: PatientHomeComponent,
  //     },
  //     {
  //       path: '',
  //       redirectTo: 'home',
  //       pathMatch: 'full',
  //     },
  //   ],
  // },
  // {
  //   path: 'admin',
  //   component: PatientLayoutComponent,
  //   canActivate: [AuthGuard],
  //   children: [
  //     {
  //       path: 'home',
  //       component: PatientHomeComponent,
  //     },
  //     {
  //       path: '',
  //       redirectTo: 'home',
  //       pathMatch: 'full',
  //     },
  //   ],
  // },
];
