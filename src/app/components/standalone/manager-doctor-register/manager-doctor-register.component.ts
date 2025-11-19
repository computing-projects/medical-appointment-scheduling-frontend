import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';


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

  constructor(private fb: FormBuilder) {

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
    if (this.registerForm.valid) {

      // Atualiza o formulário com os valores dos dropdowns customizados
      this.registerForm.patchValue({
        acceptedPlans: this.selectedDoctor.plans,
        subspecialties: this.selectedDoctor.specialties,
        status: this.selectedDoctor.status
      });

      this.isSubmitting = true;

      setTimeout(() => {
        console.log('Doctor Registration Data:', this.registerForm.value);

        this.isSubmitting = false;
        this.showSuccess = true;

        setTimeout(() => {
          this.showSuccess = false;
          this.registerForm.reset();
        }, 3000);

      }, 1500);
    } else {
      Object.keys(this.registerForm.controls).forEach(key => {
        this.registerForm.get(key)?.markAsTouched();
      });
    }
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
