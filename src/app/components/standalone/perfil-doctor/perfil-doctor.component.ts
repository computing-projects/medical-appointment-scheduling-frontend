import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PerfilPatientModalComponent, PatientDetails } from '../perfil-patient-modal/perfil-patient-modal.component';
import { PerfilDoctorCalendarComponent } from '../perfil-doctor-calendar/perfil-doctor-calendar.component';
import { StatusUtils } from '../../shared/utils/status.utils';
import { RatingUtils } from '../../shared/utils/rating.utils';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { take } from 'rxjs';

export interface DoctorProfile {
  photo: string;
  name: string;
  lastname: string;
  contact: string;
  age: string;
  specialty: string;
  crm: string;
  acceptedPlans: string[];
  availableHoursToday: string;
  email: string;
  city: string;
  cep: string;
  address: string;
  bio: string;
  review: number;
  currentMonthStats: MonthStats;
}

export interface MonthStats {
  consultas: number;
  exames: number;
  cirurgias: number;
  procedimentos: number;
  agendamentosCanceladosOuFaltados: number;
}

@Component({
  selector: 'med-perfil-doctor',
  standalone: true,
  imports: [CommonModule, PerfilPatientModalComponent, PerfilDoctorCalendarComponent],
  templateUrl: './perfil-doctor.component.html',
  styleUrl: './perfil-doctor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PerfilDoctorComponent implements OnInit {
  selectedDoctorTab: 'informacoes' | 'agenda' = 'informacoes';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.loadConsultas();
    this.updateTabFromQueryParams();
    
    this.route.queryParams.subscribe((params) => {
      const tabParam = params['tab'];
      if (tabParam === 'agenda') {
        this.selectedDoctorTab = 'agenda';
        this.cdr.markForCheck();
      } else if (tabParam === 'informacoes') {
        this.selectedDoctorTab = 'informacoes';
        this.cdr.markForCheck();
      }
    });

  }

  private updateTabFromQueryParams(): void {
    const tabParam = this.route.snapshot.queryParams['tab'];
    if (tabParam === 'agenda' || tabParam === 'informacoes') {
      this.selectedDoctorTab = tabParam;
      this.cdr.markForCheck();
    }
  }

  doctorProfile: DoctorProfile | null = null;



  // Placeholder for doctor's profile data
  // doctorProfile = {
  //   photo:'',
  //   name: 'João',
  //   lastName: 'Silva',
  //   contact: '(XX) XXXXX-XXXX',
  //   age: 42,
  //   specialty: 'Cardiologista',
  //   crm: 'CRM/SP 123456',
  //   acceptedPlans: ['Unimed', 'Bradesco Saúde', 'SulAmérica'], // New field
  //   availableHoursToday: '09:00 - 12:00, 14:00 - 18:00', // Summary of today's available hours
  //   email: 'dr.joao@example.com',
  //   city: 'São Paulo',
  //   cep: 'XXXXX-XXX',
  //   address: 'Rua Principal, 123 - Centro',
  //   bio: 'Cardiologista com mais de 15 anos de experiência, especializado em arritmias e doenças cardíacas congênitas. Atende com foco na prevenção e no bem-estar do paciente.',
  //   review: 4.8, // Example review score
  //   currentMonthStats: {
  //     consultas: 50,
  //     exames: 25,
  //     cirurgias: 3,
  //     procedimentos: 10,
  //     agendamentosCanceladosOuFaltados: 5,
  //   }
  // };

  // todayAppointments = [
  //   {
  //     id: 201,
  //     date: '23/10',
  //     time: '10:00',
  //     especialidade: 'Cardiologia',
  //     clientName: 'Ana Paula Costa',
  //     appointmentType: 'Presencial',
  //     status: 'Confirmada',
  //     appointmentLink: '',
  //     // Removed doctor specific details from here, as they're not needed for patient modal data mapping
  //     reason: 'Check-up anual e avaliação de exames recentes.',
  //     patientContact: '(11) 98765-4321', // Added patient-specific contact
  //     patientAge: 30, // Added patient-specific age
  //     patientAppointmentHistory: [{ date: '2023-04-01', type: 'Consulta de Rotina' }], // Patient's history
  //   },
  //   {
  //     id: 202,
  //     date: '23/10',
  //     time: '11:00',
  //     especialidade: 'Cardiologia',
  //     clientName: 'Carlos Eduardo Lima',
  //     appointmentType: 'Online',
  //     status: 'Aguardando',
  //     appointmentLink: '',
  //     reason: 'Retorno para discutir resultados de eletrocardiograma.',
  //     patientContact: '(11) 97777-7777',
  //     patientAge: 45,
  //     patientAppointmentHistory: [],
  //   },
  // ];



  isPatientModalOpen = false;
  selectedPatientDetails: PatientDetails | null = null;

  showDoctorTab(tab: 'informacoes' | 'agenda'): void {
    this.selectedDoctorTab = tab;
    this.cdr.markForCheck();
  }

  getStarsArray(rating: number): number[] {
    return RatingUtils.getStarsArray(rating);
  }

  getStatusIcon(status: string): string {
    return StatusUtils.getStatusIcon(status);
  }

  // openPatientAppointmentDetailsModal(appointmentId: number): void {
  //   const appointment = this.todayAppointments.find(a => a.id === appointmentId);

  //   if (appointment) {
  //     this.selectedPatientDetails = {
  //       id: appointment.id,
  //       patientName: appointment.clientName,
  //       patientContact: appointment.patientContact,
  //       patientAge: appointment.patientAge,
  //       especialidade: appointment.especialidade,
  //       appointmentType: appointment.appointmentType,
  //       appointmentStatus: appointment.status,
  //       appointmentLink: appointment.appointmentLink,
  //       reason: appointment.reason,
  //       dataHora: `${appointment.date} - ${appointment.time}`,
  //       patientAppointmentHistory: appointment.patientAppointmentHistory,
  //     };
  //     this.isPatientModalOpen = true;
  //   }
  // }

  closePatientDetailsModal(): void {
    this.isPatientModalOpen = false;
    this.selectedPatientDetails = null;
  }

  loadConsultas() {
    this.authService.getDoctorById(1) //TODO: passar id do usuario
      .pipe(take(1))
      .subscribe({
        next: response => {
          this.doctorProfile = this.mapToUserProfile(response);
          console.log('Perfil carregado:', this.doctorProfile);
          this.cdr.detectChanges();
        },
        error: err => {
          console.error('Erro no login:', err);
        },
      });
  }

  private mapToUserProfile(apiResponse: any): DoctorProfile {
    return {
      photo: apiResponse.photo || '',
      name: apiResponse.name || '',
      lastname: apiResponse.lastName || '',
      contact: apiResponse.contact || '',
      age: apiResponse.age || '',
      specialty: apiResponse.specialty || '', // Fixed: was healthPlans, should be specialty
      crm: apiResponse.crm || '',
      acceptedPlans: apiResponse.acceptedPlans || [],
      availableHoursToday: apiResponse.availableHoursToday || '',
      email: apiResponse.email || '',
      city: apiResponse.city || '',
      cep: apiResponse.cep || '',
      address: apiResponse.address || '',
      bio: apiResponse.bio || '',
      review: apiResponse.review || 0,
      currentMonthStats: this.mapToMonth(apiResponse.currentMonthStats || apiResponse.stats) // Fixed: pass the actual stats object
    };
  }

  private mapToMonth(statsData: any): MonthStats {
    // Return default values if statsData is undefined/null
    if (!statsData) {
      return {
        consultas: 0,
        exames: 0,
        cirurgias: 0,
        procedimentos: 0,
        agendamentosCanceladosOuFaltados: 0
      };
    }

    return {
      consultas: statsData.consultas || 0,
      exames: statsData.exames || 0,
      cirurgias: statsData.cirurgias || 0,
      procedimentos: statsData.procedimentos || 0,
      agendamentosCanceladosOuFaltados: statsData.agendamentosCanceladosOuFaltados || 0
    };
  } 
}