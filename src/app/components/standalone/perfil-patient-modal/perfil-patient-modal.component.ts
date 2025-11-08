import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';

export interface PatientDetails {
  id: number;
  patientName: string; // The client's name for this specific appointment
  patientContact?: string; // Optional client contact
  patientAge?: number;    // Optional client age
  especialidade: string;  // Specialty of the appointment
  appointmentType: string;
  appointmentStatus: string; // e.g., 'Confirmada', 'Pendente', 'Cancelada', 'Realizada', 'Aguardando'
  appointmentLink?: string;
  reason: string;
  dataHora: string;       // Date and time of the appointment
  patientAppointmentHistory?: { date: string; type: string; details?: string }[];
}

@Component({
  selector: 'med-perfil-patient-modal',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './perfil-patient-modal.component.html',
  styleUrl: './perfil-patient-modal.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class PerfilPatientModalComponent {
  @Input() appointment: PatientDetails | null = null;
  @Output() closeModal = new EventEmitter<void>();

  getStatusIcon(status: string | undefined): string {
    switch (status) {
      case 'Realizada':
        return '✓';
      case 'Agendada':
        return '📅';
      case 'Cancelada':
        return '❌';
      case 'Pendente':
        return '⏳';
      case 'Aguardando':
        return '⏰';
      default:
        return '📋';
    }
  }
}
