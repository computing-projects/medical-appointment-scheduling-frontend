import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { DoctorSummary } from '../scheduling-doctor-search-list/scheduling-doctor-search-list.component';
import { SchedulingDoctorSearchListComponent } from '../scheduling-doctor-search-list/scheduling-doctor-search-list.component';
import { SchedulingDoctorInfoModalComponent } from '../scheduling-doctor-info-modal/scheduling-doctor-info-modal.component';
import { SchedulingDoctorBookingComponent } from '../scheduling-doctor-booking/scheduling-doctor-booking.component';

@Component({
  selector: 'med-scheduling',
  standalone: true,
  imports: [CommonModule, SchedulingDoctorInfoModalComponent, SchedulingDoctorSearchListComponent, SchedulingDoctorBookingComponent],
  templateUrl: './scheduling.component.html',
  styleUrl: './scheduling.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class SchedulingComponent {
  selectedDoctor: DoctorSummary | null = null;
  activeDetailView: 'info' | 'agenda' | null = null;

  onShowDoctorInfo(doctor: DoctorSummary) {
    this.selectedDoctor = doctor;
    this.activeDetailView = 'info';
  }

  onShowDoctorAgenda(doctor: DoctorSummary) {
    this.selectedDoctor = doctor;
    this.activeDetailView = 'agenda';
  }

  onCloseDetailView() {
    this.selectedDoctor = null;
    this.activeDetailView = null;
  }
}