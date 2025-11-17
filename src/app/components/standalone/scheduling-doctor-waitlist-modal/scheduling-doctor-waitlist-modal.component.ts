import { Component, ViewEncapsulation, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { AppointmentType } from '../../models/api-models';
import { Clients } from '../../models/user.model';
import type { DoctorSummary } from '../scheduling-doctor-search-list/scheduling-doctor-search-list.component';

@Component({
  selector: 'med-scheduling-doctor-waitlist-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './scheduling-doctor-waitlist-modal.component.html',
  styleUrl: './scheduling-doctor-waitlist-modal.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class SchedulingDoctorWaitlistModalComponent implements OnInit {
  @Input() doctor!: DoctorSummary;
  @Input() isOpen = false;
  @Input() appointmentType: 'local' | 'remote' = 'local';
  @Input() clinicId?: number | null; // Optional clinic ID - only included if provided
  @Output() close = new EventEmitter<void>();
  
  emailForNotification = '';
  phoneForNotification = '';
  isUserLoggedIn = false;
  selectedAppointmentType: 'local' | 'remote' = 'local';
  appointmentReason = '';
  reminderChecked = false;

  constructor(
    private authService: AuthenticationService,
    private apiService: ApiService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.checkUserAuthentication();
    this.selectedAppointmentType = this.appointmentType;
  }

  checkUserAuthentication(): void {
    this.isUserLoggedIn = this.authService.isAuthenticated();
    if (this.isUserLoggedIn) {
      const user = this.authService.getUser();
      if (user) {
        this.emailForNotification = user.email || '';
      }
    }
  }

  closeModal(): void {
    this.close.emit();
  }

  joinWaitlist(): void {
    // Se usuário não está logado, validar email
    if (!this.isUserLoggedIn) {
      if (!this.emailForNotification) {
        this.toastService.warning('Por favor, forneça um email para receber notificações.');
        return;
      }
    } else {
      // Se está logado mas não tem email no perfil, pedir
      if (!this.emailForNotification) {
        this.toastService.warning('Por favor, atualize seu perfil com email para receber notificações.');
        return;
      }
    }

    // Validate reason field
    if (!this.appointmentReason || this.appointmentReason.trim().length === 0) {
      this.toastService.warning('Por favor, informe o motivo da consulta.');
      return;
    }

    // Get user to check authentication
    const user = this.authService.getUser();
    if (!user) {
      this.toastService.error('Erro: Usuário não autenticado. Por favor, faça login novamente.');
      return;
    }

    // Get userId - check both id and userId (in case API returned userId directly)
    const userId = user.id || (user as any).userId;
    if (!userId) {
      this.toastService.error('Erro: ID do usuário não encontrado. Por favor, faça login novamente.');
      return;
    }

    // If user is a client, get client data to use clientId
    const role = this.authService.getUserRole();
    if (role === 'client') {
      this.authService.getClient().subscribe({
        next: (client: Clients) => {
          console.log('client', client);
          this.submitWaitlistEntry(client.id || userId, userId);
        },
        error: (error) => {
          console.error('Erro ao obter dados do cliente:', error);
          // Fallback: use userId as clientId if getClient fails
          this.submitWaitlistEntry(userId, userId);
        }
      });
    } else {
      // For non-client users, use userId as clientId
      this.submitWaitlistEntry(userId, userId);
    }
  }

  private submitWaitlistEntry(clientId: number, userId: number): void {
    // Map appointment type to number: local = 1 (InPerson), remote = 2 (Online)
    const appointmentTypeNumber = this.selectedAppointmentType === 'local' 
      ? AppointmentType.InPerson 
      : AppointmentType.Online;

    // Build waitlist entry - only include clinicId if it exists
    const waitlistEntry: any = {
      clientId: clientId,
      doctorId: this.doctor.id,
      appointmentType: appointmentTypeNumber,
      reason: this.appointmentReason.trim()
    };

    // Only include clinicId if it's provided (not null/undefined)
    if (this.clinicId !== null && this.clinicId !== undefined) {
      waitlistEntry.clinicId = this.clinicId;
    }

    this.apiService.joinWaitlist(waitlistEntry).subscribe({
      next: (response: boolean) => {
        if (response === false) {
          // User already has a waitlist entry with this doctor
          this.toastService.info(
            `Você já está na lista de espera para ${this.doctor.name}. Você será notificado quando houver uma vaga disponível.`
          );
        } else if (response === true) {
          // Waitlist entry created successfully, appointment will be created
          const appointmentTypeLabel = this.selectedAppointmentType === 'local' ? 'Presencial' : 'Online';
          this.toastService.success(
            `Você foi adicionado à lista de espera!\n\n` +
            `Doutor: ${this.doctor.name}\n` +
            `Tipo: ${appointmentTypeLabel}\n\n` +
            `Sua consulta será agendada automaticamente quando houver uma vaga disponível. Você será notificado por email.`
          );
        }
        this.closeModal();
      },
      error: (error: any) => {
        console.error('Erro ao adicionar à lista de espera:', error);
        this.toastService.error('Erro ao adicionar à lista de espera. Por favor, tente novamente.');
      }
    });
  }

  get appointmentTypeLabel(): string {
    return this.selectedAppointmentType === 'local' ? 'Presencial' : 'Online';
  }

  get isFormValid(): boolean {
    return this.appointmentReason.trim().length > 0 && this.reminderChecked;
  }
}
