import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './components/admin-page.component';
import { AdminDashboardComponent } from '../standalone/admin-dashboard/admin-dashboard.component';
import { ManagerDoctorsComponent } from '../standalone/manager-doctors/manager-doctors.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent,
    children: [
      {
        path: 'home',
        component: AdminDashboardComponent,
      },
      {
        path: 'gerenciar-medicos',
        component: ManagerDoctorsComponent,
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}

