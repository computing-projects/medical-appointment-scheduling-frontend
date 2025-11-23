import { Component, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SchedulingDoctorCardComponent } from '../scheduling-doctor-card/scheduling-doctor-card.component';

export interface DoctorSummary {
  id: number;
  photo: string;
  name: string;
  specialty: string;
  shortDescription: string;
  crm: string;
  contact: string;
  age: number;
  acceptedPlans: string[];
  review: number;
}

@Component({
  selector: 'med-scheduling-doctor-search-list',
  standalone: true,
  imports: [CommonModule, FormsModule, SchedulingDoctorCardComponent],
  templateUrl: './scheduling-doctor-search-list.component.html',
  styleUrl: './scheduling-doctor-search-list.component.scss',
  encapsulation: ViewEncapsulation.None
})

export class SchedulingDoctorSearchListComponent {
  @Output() showDoctorInfo = new EventEmitter<DoctorSummary>();
  @Output() showDoctorAgenda = new EventEmitter<DoctorSummary>();

  search = '';
  specialty = '';
  moreFiltersOpen = false;

  // Advanced filters
  selectedHealthPlan = '';
  allowPresencial = true;
  allowOnline = true;

  specialties = ['Cardiologia', 'Dermatologia', 'Pediatria', 'Odontologia', 'Clínico Geral'];

  doctors: DoctorSummary[] = [
    {
      id: 1,
      photo: 'assets/images/mock-photo/doctor.png',
      name: 'João Silva',
      specialty: 'Cardiologia',
      shortDescription: 'Especialista em arritmias e prevenção.',
      crm: 'CRM/SP 123456',
      contact: '(11) 99999-9999',
      age: 42,
      acceptedPlans: ['Unimed', 'Bradesco Saúde'],
      review: 4.8
    },
    {
      id: 2,
      photo: 'assets/images/mock-photo/doctor.png',
      name: 'Maria Oliveira',
      specialty: 'Dermatologia',
      shortDescription: 'Tratamento de acne e doenças da pele.',
      crm: 'CRM/RJ 654321',
      contact: '(21) 98888-8888',
      age: 38,
      acceptedPlans: ['SulAmérica'],
      review: 4.6
    }
  ];

  get filteredDoctors() {
    const s = this.search.trim().toLowerCase();
    return this.doctors.filter(d => {
      // Search filter
      const matchesSearch = !s || 
        d.name.toLowerCase().includes(s) || 
        d.shortDescription.toLowerCase().includes(s) || 
        d.specialty.toLowerCase().includes(s);
      
      // Specialty filter
      const matchesSpec = !this.specialty || d.specialty === this.specialty;
      
      // Health plan filter
      const matchesHealthPlan = !this.selectedHealthPlan || 
        d.acceptedPlans.some(plan => plan.toLowerCase().includes(this.selectedHealthPlan.toLowerCase()));
      
      // Appointment type filter (for now just check if at least one type is allowed)
      const matchesAppointmentType = this.allowPresencial || this.allowOnline;
      
      return matchesSearch && matchesSpec && matchesHealthPlan && matchesAppointmentType;
    });
  }

  trackByDoctorId(index: number, doctor: DoctorSummary): number {
    return doctor.id;
  }

  clearFilters(): void {
    this.search = '';
    this.specialty = '';
    this.selectedHealthPlan = '';
    this.allowPresencial = true;
    this.allowOnline = true;
    this.moreFiltersOpen = false;
  }

  onInfo(d: DoctorSummary) { this.showDoctorInfo.emit(d); }
  onAgenda(d: DoctorSummary) { this.showDoctorAgenda.emit(d); }
}