import { RouterModule, Routes } from '@angular/router';
import { ClientPageComponent } from './components/client-page.component';
import { HomeDashboardComponent } from '../standalone/home-dashboard/home-dashboard.component';
import { NgModule } from '@angular/core';
import { SchedulingComponent } from '../standalone/scheduling/scheduling.component';
import { PerfilComponent } from '../standalone/perfil/perfil.component';

const routes: Routes = [
  {
    path: '',
    component: ClientPageComponent,
    children: [
      {
        path: 'home',
        component: HomeDashboardComponent,
      },
      {
        path: 'agendamento',
        component: SchedulingComponent,
      },
      {
        path: 'perfil',
        component: PerfilComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientPageRoutingModule {}
