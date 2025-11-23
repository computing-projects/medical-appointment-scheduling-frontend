import { RouterModule, Routes } from '@angular/router';
import { DoctorPageComponent } from './components/doctor-page.component';
import { DoctorDashboardComponent } from '../standalone/doctor-dashboard/doctor-dashboard.component';
import { PerfilDoctorComponent } from '../standalone/perfil-doctor/perfil-doctor.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: DoctorPageComponent,
    children: [
      {
        path: 'home',
        component: DoctorDashboardComponent,
      },
      {
        path: 'perfil',
        component: PerfilDoctorComponent,
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
export class DoctorPageRoutingModule {}

