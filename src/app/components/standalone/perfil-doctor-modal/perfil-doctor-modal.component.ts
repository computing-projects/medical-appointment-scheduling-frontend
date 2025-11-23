import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common'; // Import NgClass for dynamic classes

export interface DoctorDetails {
  id: number;
  doctorPhoto: string;
  doctorName: string;
  doctorLastName: string;
  doctorContact: string;
  doctorAge: number;
  doctorEspecialty: string;
  doctorCRM: string;
  doctorReview: number; // 1-5 stars
  appointmentType: string;
  appointmentStatus: string; // e.g., 'Realizada', 'Agendada', 'Cancelada', 'Pendente'
  appointmentLink?: string; // Optional link for online consultations
  reason: string; // Motivo da consulta
  history: { date: string; type: string }[]; // Historico de consultas
  dataHora: string; // Date and time of the current consultation
}

@Component({
  selector: 'med-perfil-doctor-modal',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './perfil-doctor-modal.component.html',
  styleUrl: './perfil-doctor-modal.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class PerfilDoctorModalComponent {
  @Input() appointment: DoctorDetails | null = null;
  @Output() closeModal = new EventEmitter<void>();

  getStarsArray(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

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

