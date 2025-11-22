import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from '../../services/doctor/doctor.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Users } from '../../models/user.model';
import { take } from 'rxjs';

interface Doctor {
  id: number;
  userId: number;
  crm: string;
  plans: string[];
  specialtys: string[];
}

interface StatusUtils{
  label: string;
  value: string;
}

@Component({
  selector: 'med-manager-doctor-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './manager-doctor-register.component.html',
  styleUrl: './manager-doctor-register.component.scss'
})
export class ManagerDoctorRegisterComponent {

  registerForm: FormGroup;
  isSubmitting = false;
  showSuccess = false;
  showError = false;
  errorMessage = '';

  // Dropdown flags
  plansOpen = false;
  specialtiesOpen = false;
  statusOpen = false;

  // Dados disponíveis
  availableSpecialties = [
    'Cardiologia', 'Dermatologia', 'Pediatria', 'Ortopedia', 'Ginecologia',
    'Neurologia', 'Psiquiatria', 'Oftalmologia', 'Endocrinologia', 'Urologia'
  ];

  availablePlans = [
    'Unimed', 'Bradesco Saúde', 'Amil', 'SulAmérica', 'NotreDame Intermédica',
    'Hapvida', 'Porto Seguro Saúde', 'Particular'
  ];

  statusList: StatusUtils[] = [
    { label: 'Ativo', value: 'active' },
    { label: 'Inativo', value: 'inactive' }
  ];

  // Estado do médico selecionado — usado pelos dropdowns customizados
  selectedDoctor = {
    plans: [] as string[],
    specialties: [] as string[],
    status: 'active' as 'active' | 'inactive'
  };

  constructor(private fb: FormBuilder, private doctorService: DoctorService, private authService: AuthenticationService) {

    this.registerForm = this.fb.group({
      // dados pessoais
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],

      // informação profissional
      crm: ['', Validators.required],
      specialty: ['', Validators.required],
      subspecialties: [[]],
      acceptedPlans: [[]],

      // endereço
      cep: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      complement: [''],
      neighborhood: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],

      // detalhes
      education: ['', Validators.required],
      bio: ['', [Validators.required, Validators.maxLength(500)]],
      consultationFee: ['', [Validators.required, Validators.min(0)]],

      // conta
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    });
  }

  /* ============================================================================
     SUBMIT
     ========================================================================== */

  onSubmit(): void {
      // Atualiza o formulário com os valores dos dropdowns customizados
      this.registerForm.patchValue({
        acceptedPlans: this.selectedDoctor.plans,
        subspecialties: this.selectedDoctor.specialties,
        status: this.selectedDoctor.status
      });

      this.isSubmitting = true;

      // cria o payload no formato da interface `Doctor`
      const form = this.registerForm.value;

    const currentDate = new Date().toISOString();
    const user: Users = {
      // id: 9,
      name: form.fullName,
      email: form.email,
      passwordHash: form.password,
      phone: form.phone,
      role: 'doctor',
      cep: form.cep,
      state: form.state,
      city: form.city,
      address: form.address,
      profilePhotoUrl: '',
      createdAt: currentDate,
      updatedAt: currentDate,
      deletedAt: currentDate,
    };

      const doc: Doctor = {
        id: 0,
        userId: 0,
        crm: form.crm,
        plans: this.selectedDoctor.plans,
        specialtys: this.selectedDoctor.specialties,
      };

    this.authService.signup(user)
      .pipe(take(1))
      .subscribe({
        next: response => {
          this.isSubmitting = false;
          this.doctorService.create(doc).subscribe({
            next: () => {
              this.isSubmitting = false;
              this.showSuccess = true;
              this.showError = false;

              setTimeout(() => {
                this.showSuccess = false;
                this.registerForm.reset();
              }, 3000);
            },
            error: (err: any) => {
              console.error('Erro ao criar médico:', err);
              this.isSubmitting = false;
              this.showError = true;
              this.errorMessage = err?.message || 'Erro ao criar médico';
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

  /* ============================================================================
     DROPDOWNS CUSTOMIZADOS
     ========================================================================== */

  toggleDropdown(field: 'plansOpen' | 'specialtiesOpen' | 'statusOpen') {
    this[field] = !this[field];
  }

  closeDropdown(field: 'plansOpen' | 'specialtiesOpen' | 'statusOpen') {
    setTimeout(() => this[field] = false, 120);
  }

  toggleSelection(item: string, field: 'plans' | 'specialties', event: Event) {
    event.stopPropagation();

    const targetList = this.selectedDoctor[field];
    const index = targetList.indexOf(item);

    if (index >= 0) {
      targetList.splice(index, 1);
    } else {
      targetList.push(item);
    }
  }

  selectStatus(status: any, event: MouseEvent): void {
    // Verifica se o status é válido
    if (!status) {
      console.error('Status inválido:', status);
      return;
    }

    // Lógica para tratar o status selecionado
    console.log('Status selecionado:', status);

    // Caso precise usar o evento do clique
    if (event) {
      console.log('Evento do clique:', event);
    }
  }

  /* ============================================================================
     VALIDAÇÃO
     ========================================================================== */

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.registerForm.get(fieldName);

    if (field?.hasError('required')) return 'Este campo é obrigatório';
    if (field?.hasError('email')) return 'Email inválido';
    if (field?.hasError('minlength')) return `Mínimo de ${field.getError('minlength').requiredLength} caracteres`;
    if (field?.hasError('pattern')) return 'Formato inválido';
    if (field?.hasError('min')) return 'Valor deve ser maior que 0';
    if (field?.hasError('maxlength')) return `Máximo de ${field.getError('maxlength').requiredLength} caracteres`;

    return '';
  }
}
