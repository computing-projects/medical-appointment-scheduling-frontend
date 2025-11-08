import { Component, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeDashboardComponent } from '../../standalone/home-dashboard/home-dashboard.component';
import { SchedulingComponent } from '../../standalone/scheduling/scheduling.component';
import { PerfilComponent } from '../../standalone/perfil/perfil.component';
import { PerfilDoctorComponent } from '../../standalone/perfil-doctor/perfil-doctor.component';
import { ManagerDoctorsComponent } from '../../standalone/manager-doctors/manager-doctors.component';
import { SideBarComponent } from '../../standalone/side-bar/side-bar.component';
import { RouterModule } from '@angular/router';

type ViewType = 'home' | 'agendamento' | 'perfil' | 'perfil-medico' | 'gerenciar-medicos';

@Component({
  selector: 'med-client-page',
  // imports: [
  //   CommonModule,
  //   HomeDashboardComponent,
  //   SchedulingComponent,
  //   PerfilComponent,
  //   PerfilDoctorComponent,
  //   ManagerDoctorsComponent,
  //   SideBarComponent,
  //   RouterModule,
  // ],
  templateUrl: './client-page.component.html',
  styleUrl: './client-page.component.scss',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientPageComponent {
  @HostBinding('class.med-client-page') readonly hostClass = true;

  selectedView: ViewType = 'home';

  showView(view: ViewType): void {
    this.selectedView = view;
  }

  onNavigateToView(view: string): void {
    this.showView(view as ViewType);
  }
}
