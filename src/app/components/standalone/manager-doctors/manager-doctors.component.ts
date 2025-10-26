import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerDoctorRegisterComponent } from '../manager-doctor-register/manager-doctor-register.component';
import { ManagerDoctorEditComponent } from '../manager-doctor-edit/manager-doctor-edit.component';

@Component({
  selector: 'med-manager-doctors',
  standalone: true,
  imports: [CommonModule, ManagerDoctorRegisterComponent, ManagerDoctorEditComponent],
  templateUrl: './manager-doctors.component.html',
  styleUrl: './manager-doctors.component.scss'
})
export class ManagerDoctorsComponent {
  selectedTab: 'cadastrar' | 'editar' = 'cadastrar';

  selectTab(tab: 'cadastrar' | 'editar'): void {
    this.selectedTab = tab;
  }
}
