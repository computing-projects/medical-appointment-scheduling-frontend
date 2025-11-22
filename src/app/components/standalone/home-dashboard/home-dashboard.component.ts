import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DoctorDetails } from '../perfil-doctor-modal/perfil-doctor-modal.component';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'med-home-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home-dashboard.component.html',
  styleUrl: './home-dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeDashboardComponent {

  constructor(private authService: AuthenticationService) {}

  // Dashboard data (in a real app, this would come from a service)
  upcomingAppointments = 2;
  totalConsultations = 15;
  pendingTasks = 1;
  hasUpcomingAppointment = true;

  // Modal state
  isModalOpen = false;
  selectedAppointment: DoctorDetails | null = null;

  // Next appointment mock data
  nextAppointment = {
    day: '15',
    month: 'Jan',
    doctorName: 'Dr. João Silva',
    specialty: 'Cardiologia',
    time: '10:00 - 11:00',
    type: 'Presencial',
    location: 'Clínica São Paulo'
  };

  // Full appointment details for modal (mock data)
  private appointmentDetails: DoctorDetails = {
    id: 1,
    doctorPhoto: 'https://randomuser.me/api/portraits/men/32.jpg',
    doctorName: 'João',
    doctorLastName: 'Silva',
    doctorContact: '(11) 98765-4321',
    doctorAge: 45,
    doctorEspecialty: 'Cardiologia',
    doctorCRM: 'CRM/SP 123456',
    doctorReview: 4.8,
    appointmentType: 'Presencial',
    appointmentStatus: 'Agendada',
    appointmentLink: '',
    dataHora: '15/01/2025 às 10:00',
    reason: 'Consulta de rotina para acompanhamento cardiovascular. Paciente apresenta histórico de hipertensão e necessita avaliação periódica.',
    history: [
      { date: '10/12/2024', type: 'Consulta de Rotina' },
      { date: '15/09/2024', type: 'Exame Cardiológico' },
      { date: '20/06/2024', type: 'Consulta de Acompanhamento' }
    ]
  };

  viewAppointmentDetails(): void {
    this.selectedAppointment = this.appointmentDetails;
    this.isModalOpen = true;
  }

  closeAppointmentModal(): void {
    this.isModalOpen = false;
    this.selectedAppointment = null;
  }
  displayUserName(): string | undefined {
    if (this.authService.getUser()?.name !== undefined)
      return this.authService.getUser()?.name
    else return '';
  }
}

