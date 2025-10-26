import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilPatientModalComponent, PatientDetails } from '../perfil-patient-modal/perfil-patient-modal.component';
import { PerfilDoctorCalendarComponent } from '../perfil-doctor-calendar/perfil-doctor-calendar.component';
import { StatusUtils } from '../../../shared/utils/status.utils';
import { RatingUtils } from '../../../shared/utils/rating.utils';

@Component({
  selector: 'med-perfil-doctor',
  standalone: true,
  imports: [CommonModule, PerfilPatientModalComponent, PerfilDoctorCalendarComponent],
  templateUrl: './perfil-doctor.component.html',
  styleUrl: './perfil-doctor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerfilDoctorComponent {
  selectedDoctorTab: 'informacoes' | 'agenda' = 'informacoes';

  // Placeholder for doctor's profile data
  doctorProfile = {
    photo: 'data:image/jpeg;base64,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', // Replace with an actual image path
    name: 'João',
    lastName: 'Silva',
    contact: '(XX) XXXXX-XXXX',
    age: 42,
    specialty: 'Cardiologista',
    crm: 'CRM/SP 123456',
    acceptedPlans: ['Unimed', 'Bradesco Saúde', 'SulAmérica'], // New field
    availableHoursToday: '09:00 - 12:00, 14:00 - 18:00', // Summary of today's available hours
    email: 'dr.joao@example.com',
    city: 'São Paulo',
    cep: 'XXXXX-XXX',
    address: 'Rua Principal, 123 - Centro',
    bio: 'Cardiologista com mais de 15 anos de experiência, especializado em arritmias e doenças cardíacas congênitas. Atende com foco na prevenção e no bem-estar do paciente.',
    review: 4.8  // Example review score
  };

  todayAppointments = [
    {
      id: 201,
      date: '23/10',
      time: '10:00',
      especialidade: 'Cardiologia',
      clientName: 'Ana Paula Costa',
      appointmentType: 'Presencial',
      status: 'Confirmada',
      appointmentLink: '',
      // Removed doctor specific details from here, as they're not needed for patient modal data mapping
      reason: 'Check-up anual e avaliação de exames recentes.',
      patientContact: '(11) 98765-4321', // Added patient-specific contact
      patientAge: 30, // Added patient-specific age
      patientAppointmentHistory: [{ date: '2023-04-01', type: 'Consulta de Rotina' }] // Patient's history
    },
    {
      id: 202,
      date: '23/10',
      time: '11:00',
      especialidade: 'Cardiologia',
      clientName: 'Carlos Eduardo Lima',
      appointmentType: 'Online',
      status: 'Aguardando',
      appointmentLink: '',
      reason: 'Retorno para discutir resultados de eletrocardiograma.',
      patientContact: '(11) 97777-7777',
      patientAge: 45,
      patientAppointmentHistory: []
    }
  ];

  currentMonthStats = {
    consultas: 50,
    exames: 25,
    cirurgias: 3,
    procedimentos: 10,
    agendamentosCanceladosOuFaltados: 5
  };

  isPatientModalOpen = false;
  selectedPatientDetails: PatientDetails | null = null;

  showDoctorTab(tab: 'informacoes' | 'agenda'): void {
    this.selectedDoctorTab = tab;
  }

  getStarsArray(rating: number): number[] {
    return RatingUtils.getStarsArray(rating);
  }

  getStatusIcon(status: string): string {
    return StatusUtils.getStatusIcon(status);
  }

  openPatientAppointmentDetailsModal(appointmentId: number): void {
    const appointment = this.todayAppointments.find(a => a.id === appointmentId);

    if (appointment) {
      this.selectedPatientDetails = {
        id: appointment.id,
        patientName: appointment.clientName,
        patientContact: appointment.patientContact,
        patientAge: appointment.patientAge,
        especialidade: appointment.especialidade,
        appointmentType: appointment.appointmentType,
        appointmentStatus: appointment.status,
        appointmentLink: appointment.appointmentLink,
        reason: appointment.reason,
        dataHora: `${appointment.date} - ${appointment.time}`,
        patientAppointmentHistory: appointment.patientAppointmentHistory
      };
      this.isPatientModalOpen = true;
    }
  }

  closePatientDetailsModal(): void {
    this.isPatientModalOpen = false;
    this.selectedPatientDetails = null;
  }
}
