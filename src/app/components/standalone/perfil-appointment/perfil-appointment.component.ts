import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PerfilDoctorModalComponent, DoctorDetails } from '../perfil-doctor-modal/perfil-doctor-modal.component';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { take } from 'rxjs';


interface ConsultationHistory {
  date: string;
  type: string;
}

export interface Consultation {
  id: number;
  status: string;
  doctorPhoto: string;
  especialidade: string;
  profissional: string;
  tipo: string;
  dataHora: string;
  doctorName: string;
  doctorLastName: string;
  doctorContact: string;
  doctorAge: number;
  doctorEspecialty: string;
  doctorCRM: string;
  doctorReview: number;
  appointmentType: string;
  appointmentStatus: string;
  appointmentLink?: string;
  reason: string;
  history: ConsultationHistory[];
}

@Component({
  selector: 'med-perfil-appointment',
  standalone: true,
  imports: [CommonModule, FormsModule, PerfilDoctorModalComponent],
  templateUrl: './perfil-appointment.component.html',
  styleUrl: './perfil-appointment.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class PerfilAppointmentComponent implements OnInit {
  selectedConsultasView: 'realizadas' | 'agendadas' = 'realizadas';
  searchQuery: string = '';
  filterEspecialidade: string = '';
  specialtyOptions: string[] = ['Cardiologia', 'Dermatologia', 'Pediatria', 'Odontologia', 'Clínico Geral'];

  // Data for the modal
  isDoctorModalOpen: boolean = false;
  selectedDoctorDetails: DoctorDetails | null = null;

  consultas: Consultation[] = [];

  constructor(private authService: AuthenticationService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadConsultas();
  }

  showConsultasView(view: 'realizadas' | 'agendadas') {
    this.selectedConsultasView = view;
    // You might want to reset search/filter when switching views
    this.searchQuery = '';
    this.filterEspecialidade = '';
  }

  // You would implement actual filtering logic here based on searchQuery and filterEspecialidade
  get filteredConsultas() {
    return this.consultas.filter(c => {
      const matchesSearch = c.profissional.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            c.especialidade.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesFilter = this.filterEspecialidade === '' || c.especialidade === this.filterEspecialidade;
      return matchesSearch && matchesFilter;
    });
  }

  openDoctorDetailsModal(consultationId: number, type: 'realizada' | 'agendada') {

    const consultationData = this.consultas.find(
      c => c.id === consultationId
    ) as DoctorDetails | undefined;

    if (consultationData) {
      this.selectedDoctorDetails = consultationData;
      this.isDoctorModalOpen = true;
    } else {
      console.error('Consulta não encontrada para o ID:', consultationId);
    }
  }

  closeDoctorDetailsModal() {
    this.isDoctorModalOpen = false;
    this.selectedDoctorDetails = null; // Clear data when closing
  }

  cancelAppointment(consultationId: number) {
    console.log(`Cancelar agendamento ID: ${consultationId}`);
    // Here you would implement logic to cancel the appointment, likely involving an API call
    alert(`Agendamento ID ${consultationId} será cancelado.`);
  }
    private mapToConsultas(apiResponse: any): Consultation[] {
    if (!apiResponse) {
      console.error('Resposta da API inválida');
      return [];
    }

    // Se a resposta for um array
    if (Array.isArray(apiResponse)) {
      return apiResponse.map(item => this.mapSingleConsultation(item));
    }

    // Se a resposta tiver um array dentro de uma propriedade
    if (apiResponse.data && Array.isArray(apiResponse.data)) {
      return apiResponse.data.map((item: any) => this.mapSingleConsultation(item));
    }

    // Se for um único objeto, retornar como array
    return [this.mapSingleConsultation(apiResponse)];
  }

  private mapSingleConsultation(item: any): Consultation {
    return {
      // IDs e Status
      id: item.id || 0,
      status: item.status || 'Não informado',
      appointmentStatus: item.appointmentStatus || item.status || 'Pendente',

      // Dados do Médico - Foto
      doctorPhoto: item.doctorPhoto || item.medicoFoto || '',

      // Dados do Médico - Informações Pessoais
      doctorName: item.doctorName || item.medicoNome || '',
      doctorLastName: item.doctorLastName || item.medicoSobrenome || '',
      doctorContact: item.doctorContact || item.medicoContato || item.medicoTelefone || '',
      doctorAge: item.doctorAge || item.medicoIdade || 0,

      // Dados do Médico - Informações Profissionais
      especialidade: item.especialidade || item.doctorEspecialty || '',
      doctorEspecialty: item.doctorEspecialty || item.especialidade || '',
      doctorCRM: item.doctorCRM || item.medicoCRM || '',
      doctorReview: item.doctorReview || item.medicoAvaliacao || 0,
      profissional: item.profissional || 
                    (item.doctorName && item.doctorLastName 
                      ? `${item.doctorName} ${item.doctorLastName}` 
                      : ''),

      // Dados da Consulta
      tipo: item.tipo || item.appointmentType || 'Não especificado',
      appointmentType: item.appointmentType || item.tipo || 'Presencial',
      dataHora: item.dataHora || item.data || item.appointmentDateTime || '',
      appointmentLink: item.appointmentLink || item.linkConsulta || undefined,
      reason: item.reason || item.motivo || item.motivoConsulta || '',

      // Histórico
      history: this.mapHistory(item.history || item.historico || [])
    };
  }

  private mapHistory(historyData: any): ConsultationHistory[] {
    if (!Array.isArray(historyData)) {
      return [];
    }

    return historyData.map((h: any) => ({
      date: h.date || h.data || '',
      type: h.type || h.tipo || ''
    }));
  }

  private loadConsultas(): void {
    this.authService.getConsultasByUserId(1)
      .pipe(take(1))
      .subscribe({
        next: response => {
          this.consultas = this.mapToConsultas(response);
          this.cdr.detectChanges();
          console.log('Consultas carregadas:', this.consultas);
        },
        error: err => {
          console.error('Erro ao carregar consultas:', err);
          // Opcional: exibir mensagem de erro para o usuário
        }
      });
  }


}