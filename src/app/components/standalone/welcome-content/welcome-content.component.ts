import { Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf

import { SchedulingComponent } from '../scheduling/scheduling.component';
import { PerfilComponent } from '../perfil/perfil.component';
import { PerfilDoctorComponent } from '../perfil-doctor/perfil-doctor.component';

@Component({
  selector: 'med-welcome-content',
  standalone: true,
  imports: [CommonModule, SchedulingComponent, PerfilComponent, PerfilDoctorComponent],
  templateUrl: './welcome-content.component.html',
  styleUrl: './welcome-content.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class WelcomeContentComponent {
  @HostBinding('class.med-welcome-content') isActive = true;

  // Property to hold the currently selected view
  selectedView: 'home' | 'agendamento' | 'perfil' | 'perfil-medico' = 'home';

  // Method to change the selected view
  showView(view: 'home' | 'agendamento' | 'perfil' | 'perfil-medico') {
    this.selectedView = view;
  }
}
