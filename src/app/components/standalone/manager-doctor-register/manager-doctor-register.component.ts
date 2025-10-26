import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  availableSpecialties = [
    'Cardiologia',
    'Dermatologia',
    'Pediatria',
    'Ortopedia',
    'Ginecologia',
    'Neurologia',
    'Psiquiatria',
    'Oftalmologia',
    'Endocrinologia',
    'Urologia'
  ];

  availablePlans = [
    'Unimed',
    'Bradesco Saúde',
    'Amil',
    'SulAmérica',
    'NotreDame Intermédica',
    'Hapvida',
    'Porto Seguro Saúde',
    'Particular'
  ];

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      // Personal Information
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\) \d{4,5}-\d{4}$/)]],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      
      // Professional Information
      crm: ['', [Validators.required, Validators.pattern(/^[A-Z]{2}\/\d{4,6}$/)]],
      specialty: ['', Validators.required],
      subspecialties: [[]],
      acceptedPlans: [[]],
      
      // Address Information
      cep: ['', [Validators.required, Validators.pattern(/^\d{5}-\d{3}$/)]],
      street: ['', Validators.required],
      number: ['', Validators.required],
      complement: [''],
      neighborhood: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      
      // Professional Details
      education: ['', Validators.required],
      bio: ['', [Validators.required, Validators.maxLength(500)]],
      consultationFee: ['', [Validators.required, Validators.min(0)]],
      
      // Account Credentials
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isSubmitting = true;
      
      // Simulate API call
      setTimeout(() => {
        console.log('Doctor Registration Data:', this.registerForm.value);
        this.isSubmitting = false;
        this.showSuccess = true;
        
        // Reset form after 3 seconds
        setTimeout(() => {
          this.showSuccess = false;
          this.registerForm.reset();
        }, 3000);
      }, 1500);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.registerForm.controls).forEach(key => {
        this.registerForm.get(key)?.markAsTouched();
      });
    }
  }

  togglePlan(plan: string): void {
    const plans = this.registerForm.get('acceptedPlans')?.value || [];
    const index = plans.indexOf(plan);
    
    if (index > -1) {
      plans.splice(index, 1);
    } else {
      plans.push(plan);
    }
    
    this.registerForm.patchValue({ acceptedPlans: plans });
  }

  isPlanSelected(plan: string): boolean {
    const plans = this.registerForm.get('acceptedPlans')?.value || [];
    return plans.includes(plan);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.registerForm.get(fieldName);
    
    if (field?.hasError('required')) {
      return 'Este campo é obrigatório';
    }
    if (field?.hasError('email')) {
      return 'Email inválido';
    }
    if (field?.hasError('minlength')) {
      return `Mínimo de ${field.getError('minlength').requiredLength} caracteres`;
    }
    if (field?.hasError('pattern')) {
      return 'Formato inválido';
    }
    if (field?.hasError('min')) {
      return 'Valor deve ser maior que 0';
    }
    if (field?.hasError('maxlength')) {
      return `Máximo de ${field.getError('maxlength').requiredLength} caracteres`;
    }
    
    return '';
  }
}
