import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { PerfilPatientModalComponent, PatientDetails } from '../perfil-patient-modal/perfil-patient-modal.component';

@Component({
  selector: 'med-doctor-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, PerfilPatientModalComponent],
  templateUrl: './doctor-dashboard.component.html',
  styleUrl: './doctor-dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DoctorDashboardComponent {
  constructor(private router: Router) {}

  navigateToAgenda(event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.router.navigateByUrl('/doutor/perfil?tab=agenda');
  }

  // Dashboard data (in a real app, this would come from a service)
  doctorName = 'Dr. João Silva';
  todayAppointments = 8;
  pendingAppointments = 3;
  totalPatients = 127;
  averageRating = 4.8;
  hasNextAppointment = true;

  // Modal state
  isModalOpen = false;
  selectedAppointment: PatientDetails | null = null;

  // Next appointment mock data
  nextAppointment = {
    day: '15',
    month: 'Jan',
    patientName: 'Maria Santos',
    specialty: 'Cardiologia',
    time: '10:00 - 11:00',
    type: 'Presencial',
    reason: 'Consulta de rotina para acompanhamento cardiovascular'
  };

  // Full appointment details for modal (mock data)
  private appointmentDetails: PatientDetails = {
    id: 1,
    patientName: 'Maria Santos',
    patientContact: '(11) 98765-4321',
    patientAge: 45,
    especialidade: 'Cardiologia',
    appointmentType: 'Presencial',
    appointmentStatus: 'Agendada',
    appointmentLink: '',
    dataHora: '15/01/2025 às 10:00',
    reason: 'Consulta de rotina para acompanhamento cardiovascular. Paciente apresenta histórico de hipertensão e necessita avaliação periódica.',
    patientAppointmentHistory: [
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
}
