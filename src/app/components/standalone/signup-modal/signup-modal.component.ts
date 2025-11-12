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
  cep = '';
  state = '';
  city = '';
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

  // Tratamento do submit fica TODO aqui
  submit(form: NgForm) {
    this.errorMessage = '';

    if (form.invalid || !this.acceptTerms) {
      this.errorMessage = !this.acceptTerms
        ? 'Você precisa aceitar os Termos e Condições para se cadastrar.'
        : 'Verifique os campos obrigatórios.';
      return;
    }

    this.isSubmitting = true;

    const payload = {
      name: this.name,
      email: this.email,
      cpf: this.cpf,
      cep: this.cep,
      state: this.state,
      city: this.city,
      birthDate: this.birthDate,
      phone: this.phone,
      password: this.password,
      healthPlanId: this.healthPlanId,
      acceptTerms: this.acceptTerms,
    };

    // Aqui você integra com sua API de signup
    // Exemplo genérico com Promise para ilustrar:
    fakeSignupRequest(payload)
      .then(() => {
        this.isSubmitting = false;
        this.close.emit();
      })
      .catch(() => {
        this.isSubmitting = false;
        this.errorMessage = 'Erro ao realizar cadastro. Tente novamente.';
      });

    function fakeSignupRequest(data: any): Promise<void> {
      console.log('signup payload', data);
      return new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}
