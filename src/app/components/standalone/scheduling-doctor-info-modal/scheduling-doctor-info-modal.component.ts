import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { DoctorSummary } from '../scheduling-doctor-search-list/scheduling-doctor-search-list.component';

@Component({
  selector: 'med-scheduling-doctor-info-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scheduling-doctor-info-modal.component.html',
  styleUrl: './scheduling-doctor-info-modal.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class SchedulingDoctorInfoModalComponent {
  @Input() doctor!: DoctorSummary;

  getStarArray(): number[] {
    return Array(Math.floor(this.doctor.review)).fill(0);
  }

  getEmptyStarArray(): number[] {
    return Array(5 - Math.floor(this.doctor.review)).fill(0);
  }

  getReviewCount(): number {
    // Mock review count based on rating
    return Math.floor(this.doctor.review * 50 + Math.random() * 100);
  }

  getPatientCount(): number {
    // Mock patient count based on age/experience
    const basePatients = (this.doctor.age - 25) * 150;
    return Math.max(500, basePatients);
  }

  getExperienceYears(): number {
    // Calculate years of experience
    return Math.max(1, this.doctor.age - 25);
  }

  getClinicCount(): number {
    // Mock clinic count (1-3)
    return Math.floor(Math.random() * 3) + 1;
  }

  getEducation(): string {
    // Mock education based on specialty
    const universities = [
      'Universidade de São Paulo (USP)',
      'Universidade Federal do Rio de Janeiro (UFRJ)',
      'Universidade Estadual de Campinas (UNICAMP)',
      'Universidade Federal de São Paulo (UNIFESP)'
    ];
    return universities[Math.floor(Math.random() * universities.length)];
  }
}
