import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../services/toast.service';
import type { DoctorSummary } from '../scheduling-doctor-search-list/scheduling-doctor-search-list.component';

interface AppointmentDetails {
  doctor: DoctorSummary;
  date: string;
  time: string;
  type: 'local' | 'remote';
}

@Component({
  selector: 'med-scheduling-doctor-appointment-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './scheduling-doctor-appointment-modal.component.html',
  styleUrl: './scheduling-doctor-appointment-modal.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class SchedulingDoctorAppointmentModalComponent {
  @Input() appointmentDetails!: AppointmentDetails;
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<{ appointmentDetails: AppointmentDetails; reason: string; confirmedReminder: boolean }>();

  // Mock user data (in production, this would come from auth service)
  userData = {
    name: 'Maria Silva Santos',
    email: 'maria.santos@email.com',
    phone: '(11) 98765-4321',
    cpf: '123.456.789-00',
    healthPlan: 'Unimed'
  };

  appointmentReason = '';
  confirmedReminder = false;
  isSubmitting = false;

  constructor(private toastService: ToastService) {}

  closeModal(): void {
    if (this.isSubmitting) return;
    this.appointmentReason = '';
    this.confirmedReminder = false;
    this.close.emit();
  }

  confirmAppointment(): void {
    if (!this.appointmentReason.trim()) {
      this.toastService.warning('Por favor, informe o motivo da consulta.');
      return;
    }

    if (!this.confirmedReminder) {
      this.toastService.warning('Por favor, confirme que leu as instruções importantes.');
      return;
    }

    this.isSubmitting = true;
    
    // Simulate API call
    setTimeout(() => {
      this.confirm.emit({
        appointmentDetails: this.appointmentDetails,
        reason: this.appointmentReason,
        confirmedReminder: this.confirmedReminder
      });
      this.isSubmitting = false;
      this.closeModal();
    }, 800);
  }

  get appointmentTypeLabel(): string {
    return this.appointmentDetails?.type === 'local' ? 'Presencial' : 'Online';
  }

  get isFormValid(): boolean {
    return this.appointmentReason.trim().length > 10 && this.confirmedReminder;
  }
}
