import { Component, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeDashboardComponent } from '../home-dashboard/home-dashboard.component';
import { SchedulingComponent } from '../scheduling/scheduling.component';
import { PerfilComponent } from '../perfil/perfil.component';
import { PerfilDoctorComponent } from '../perfil-doctor/perfil-doctor.component';
import { ManagerDoctorsComponent } from '../manager-doctors/manager-doctors.component';

type ViewType = 'home' | 'agendamento' | 'perfil' | 'perfil-medico' | 'gerenciar-medicos';

@Component({
  selector: 'med-welcome-content',
  standalone: true,
  imports: [
    CommonModule,
    HomeDashboardComponent,
    SchedulingComponent,
    PerfilComponent,
    PerfilDoctorComponent,
    ManagerDoctorsComponent
  ],
  templateUrl: './welcome-content.component.html',
  styleUrl: './welcome-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeContentComponent {
  @HostBinding('class.med-welcome-content') readonly hostClass = true;

  selectedView: ViewType = 'home';

  showView(view: ViewType): void {
    this.selectedView = view;
  }

  onNavigateToView(view: string): void {
    this.showView(view as ViewType);
  }
}
