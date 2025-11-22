import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../services/toast.service';
import type { DoctorSummary } from '../scheduling-doctor-search-list/scheduling-doctor-search-list.component';
import { ApiService } from '../../services/api.service';
import { take } from 'rxjs';

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
    name: 'Paciente',
    email: 'paciente@email.com',
    phone: '(99) 99999-9999',
    cpf: '123.456.789-10',
    healthPlan: 'Unimed'
  };

  appointmentReason = '';
  confirmedReminder = false;
  isSubmitting = false;
  id = 0;
  errorMessage = '';

  constructor(private apiService: ApiService, private toastService: ToastService) {}

  ngOnInit(): void {
    const userStorage = JSON.parse(localStorage.getItem('user')!);

    this.id = userStorage.userId;
    this.apiService.clientGetById(this.id).subscribe({
      next: response => {
        this.userData.name = userStorage.name;
        this.userData.email = userStorage.email;
        this.userData.cpf = response.cpf;
        this.userData.phone = response.phone;
      }
    });
  }

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
    
    let data = {
      clientId: this.id,
      doctorId: 1,
      clinicId: 1,
      appointmentDatetime: "2025-11-19T11:00:00.676Z",
      appointmentType: 1,
      status: 1,
      videoCallLink: this.appointmentTypeLabel? this.appointmentTypeLabel : "",
      category: 1,
      reason: this.appointmentReason
    }
    

    // Request not working

    // this.apiService.createAppointment(data).pipe(take(1)).subscribe({
    //   next: (response) => {
    //     this.isSubmitting = false;
    //     this.closeModal();
    //   },
    //   error: err => {
    //     this.isSubmitting = false;
    //     this.errorMessage = err.error?.message || 'Erro ao agendar. Tente novamente mais tarde.';
    //     console.error('Erro:', err);
    //   },
    // });

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
