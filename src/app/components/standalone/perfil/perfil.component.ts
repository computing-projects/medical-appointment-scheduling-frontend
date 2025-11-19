import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilAppointmentComponent } from '../perfil-appointment/perfil-appointment.component';
import { PerfilAnamneseComponent } from '../perfil-anamnese/perfil-anamnese.component';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { take } from 'rxjs';


export interface UserProfile {
  photo: string;
  name: string;
  contact: string;
  age: string;
  state: string;
  healthPlans: string[];
  email: string;
  cpf: string;
  city: string;
  cep: string;
  consultas: number;
  exames: number;
  cirurgias: number;
  procedimentos: number;
  agendamentosCanceladosOuFaltados: number;
}

@Component({
  selector: 'med-perfil',
  standalone: true,
  imports: [CommonModule, PerfilAppointmentComponent, PerfilAnamneseComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class PerfilComponent implements OnInit {
  selectedPerfilTab: 'informacoes' | 'consultas' | 'fichaMedica' = 'informacoes';
  userProfile: UserProfile | null = null;

  constructor(private authService: AuthenticationService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.authService.getUserById(1)
      .pipe(take(1))
      .subscribe({
        next: response => {
          this.userProfile = this.mapToUserProfile(response);
          console.log('Perfil carregado:', this.userProfile);
          this.cdr.detectChanges();
        },
        error: err => {
          console.error('Erro no login:', err);
        },
      });
  }

  private mapToUserProfile(apiResponse: any): UserProfile {
    return {
      photo: apiResponse.photo || '',
      name: apiResponse.name || '',
      contact: apiResponse.contact || '',
      age: apiResponse.age || 0,
      state: apiResponse.state || '',
      healthPlans: apiResponse.healthPlans || [],
      email: apiResponse.email || '',
      cpf: apiResponse.cpf || '',
      city: apiResponse.city || '',
      cep: apiResponse.cep || '',
      consultas: apiResponse.consultas || 0,
      exames: apiResponse.exames || 0,
      cirurgias: apiResponse.cirurgias || 0,
      procedimentos: apiResponse.procedimentos || 0,
      agendamentosCanceladosOuFaltados: apiResponse.agendamentosCanceladosOuFaltados || 0
    };
  }
  

  showPerfilTab(tab: 'informacoes' | 'consultas' | 'fichaMedica') {
    this.selectedPerfilTab = tab;
  }
}
