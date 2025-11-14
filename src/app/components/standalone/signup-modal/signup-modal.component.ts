import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { Clients, Users } from '../../models/user.model';
import { take } from 'rxjs';
import { ApiService } from '../../services/api.service';

interface HealthPlan {
  id: number | string;
  name: string;
}

@Component({
  selector: 'med-signup-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIcon, MatTooltipModule],
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SignupModalComponent implements AfterViewInit {
  @HostBinding('class.med-modal') isActive = true;

  @Input() modalOpen = false;
  @Output() close = new EventEmitter<void>();

  @ViewChild('firstField') firstField!: ElementRef<HTMLInputElement>;
  @ViewChild('card') card!: ElementRef<HTMLDivElement>;

  // Campos do formulário
  name = '';
  email = '';
  cpf = '';
  rg = '';
  cep = '';
  state = '';
  city = '';
  address = '';
  birthDate = '';
  phone = '';
  password = '';
  healthPlanId: string | number | '' = '';
  acceptTerms = false;

  // UI state
  showPassword = false;
  showPasswordInfo = false;
  isSubmitting = false;
  errorMessage = '';

  healthPlans: HealthPlan[] = [];

  constructor(private authService: AuthenticationService, private router: Router, private apiService: ApiService) {}

  ngAfterViewInit(): void {
    if (this.modalOpen && this.firstField) {
      queueMicrotask(() => this.firstField.nativeElement.focus());
    }
  }

  // Exemplo: aqui você chama sua API real
  // Ideal: mover para um service injetado.
  loadHealthPlans() {
    // mock enquanto não integra com API
    this.healthPlans = [
      { id: 1, name: 'Plano A' },
      { id: 2, name: 'Plano B' },
      { id: 3, name: 'Plano C' },
    ];
  }

  // Chamado quando o modal abre (pode ser ajustado no pai)
  onOpened() {
    this.loadHealthPlans();
    queueMicrotask(() => {
      if (this.firstField) this.firstField.nativeElement.focus();
    });
  }

  // Fecha ao clicar fora do card
  onBackdrop(event: MouseEvent) {
    if (!this.card) return;
    if (!this.card.nativeElement.contains(event.target as Node)) {
      this.close.emit();
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.close.emit();
    }
  }

  togglePasswordInfo(event?: Event) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    this.showPasswordInfo = !this.showPasswordInfo;
  }

  submit(form: NgForm) {
    this.errorMessage = '';
    console.log(form);

    if (form.invalid) {
      this.errorMessage = 'Verifique os campos preenchidos e tente novamente.';
      return;
    }

    this.isSubmitting = true;
    const currentDate = new Date().toISOString();

    const user: Users = {
      id: 0,
      name: this.name,
      email: this.email,
      passwordHash: this.password,
      phone: this.phone,
      role: 'client',
      cep: this.cep,
      state: this.state,
      city: this.city,
      address: this.address,
      profilePhotoUrl: '',
      createdAt: currentDate,
      updatedAt: currentDate,
      deletedAt: currentDate,
    };

    const client: Clients = {
      id: 0,
      userId: user.id,
      rg: this.rg,
      cpf: this.cpf,
      phone: this.phone,
      birthDate: this.birthDate
    }

    const credentialsUser = {
      email: this.email,
      password: this.password
    }

    // healthPlanId: this.healthPlanId,
    
    this.authService.signup(user)
      .pipe(take(1))
      .subscribe({
        next: response => {
          this.isSubmitting = false;
          this.authService.clientRegister(client)
          .pipe(take(1))
          .subscribe({
            next: response => {
              this.isSubmitting = false;
              this.apiService.signup(credentialsUser).subscribe({
                next: (response) => {
                  localStorage.setItem('token', response.token);
                  this.apiService.getCurrentUser().subscribe({
                    next: (user: Users) => {
                      localStorage.setItem('user', JSON.stringify(user));
                      localStorage.setItem('role', user.role);
                    },
                    error: err => {
                      this.isSubmitting = false;
                      this.errorMessage = err.error?.message || 'Erro ao cadastrar. Tente novamente mais tarde.';
                      console.error('Erro:', err);
                    },
                  });
                },
                error: err => {
                  this.isSubmitting = false;
                  this.errorMessage = err.error?.message || 'Erro ao cadastrar. Tente novamente mais tarde.';
                  console.error('Erro:', err);
                },
              });
            },
            error: err => {
              this.isSubmitting = false;
              this.errorMessage = err.error?.message || 'Erro ao cadastrar. Verifique se os campos estão corretos.';
              console.error('Erro no cadatro do cliente:', err);
            },
          });
        },
        error: err => {
          this.isSubmitting = false;
          this.errorMessage = err.error?.message || 'Erro ao cadastrar. Verifique se os campos estão corretos.';
          console.error('Erro no cadastro do usuário:', err);
        },
      });
  }
}
