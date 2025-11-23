import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { catchError } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';
import { take } from 'rxjs/operators';
import { Speciality } from '../../models/api-models';
import { Users } from '../../models/user.model';

// Mapping from Speciality enum to Portuguese display names
const SPECIALITY_NAMES: { [key in Speciality]: string } = {
  [Speciality.Cardiology]: 'Cardiologia',
  [Speciality.Dermatology]: 'Dermatologia',
  [Speciality.Endocrinology]: 'Endocrinologia',
  [Speciality.Gastroenterology]: 'Gastroenterologia',
  [Speciality.Neurology]: 'Neurologia',
  [Speciality.Orthopedics]: 'Ortopedia',
  [Speciality.Pediatrics]: 'Pediatria',
  [Speciality.Psychiatry]: 'Psiquiatria',
  [Speciality.General]: 'Clínico Geral'
};


interface StatusUtils{
  label: string;
  value: string;
}

interface TimeRange {
  startTime: string;
  endTime: string;
}

interface DaySchedule {
  dayOfWeek: number;
  dayName: string;
  enabled: boolean;
  timeRanges: TimeRange[];
  editing?: boolean;
}

@Component({
  selector: 'med-manager-doctor-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './manager-doctor-register.component.html',
  styleUrl: './manager-doctor-register.component.scss'
})
export class ManagerDoctorRegisterComponent implements OnInit {

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
  availableSpecialties: { value: Speciality; label: string }[] = [];

  availablePlans: { id: number; name: string }[] = [];
  availableClinics: { id: number; name: string }[] = [];
  selectedPlanIds: number[] = []; // Store plan IDs for API calls
  selectedClinicName: string = ''; // Store clinic name for display

  statusList: StatusUtils[] = [
    { label: 'Ativo', value: 'active' },
    { label: 'Inativo', value: 'inactive' }
  ];

  // Estado do médico selecionado — usado pelos dropdowns customizados
  selectedDoctor = {
    plans: [] as string[],
    specialties: [] as string[],
    status: 'active' as 'active' | 'inactive',
    clinicId: null as number | null
  };

  ngOnInit(): void {
    if (!this.selectedDoctor.plans) {
      this.selectedDoctor.plans = [];
    }
    if (!this.selectedDoctor.specialties) {
      this.selectedDoctor.specialties = [];
    }
    if (!this.selectedPlanIds) {
      this.selectedPlanIds = [];
    }

    this.loadHealthPlans();
    this.loadClinics();
    this.loadSpecialties();
    this.initializeTimeOptions();

    const storedClinicId = localStorage.getItem('clinicId');
    if (storedClinicId) {
      const clinicId = parseInt(storedClinicId, 10);
      if (!isNaN(clinicId)) {
        this.selectedDoctor.clinicId = clinicId;
      }
    }
  }

  // Schedule management
  // Backend enum: Monday=1, Tuesday=2, Wednesday=3, Thursday=4, Friday=5, Saturday=6, Sunday=7
  weeklySchedule: DaySchedule[] = [
    { dayOfWeek: 1, dayName: 'Segunda-feira', enabled: false, timeRanges: [] },
    { dayOfWeek: 2, dayName: 'Terça-feira', enabled: false, timeRanges: [] },
    { dayOfWeek: 3, dayName: 'Quarta-feira', enabled: false, timeRanges: [] },
    { dayOfWeek: 4, dayName: 'Quinta-feira', enabled: false, timeRanges: [] },
    { dayOfWeek: 5, dayName: 'Sexta-feira', enabled: false, timeRanges: [] },
    { dayOfWeek: 6, dayName: 'Sábado', enabled: false, timeRanges: [] },
    { dayOfWeek: 7, dayName: 'Domingo', enabled: false, timeRanges: [] }
  ];

  // Time options for dropdowns
  timeOptions: string[] = [];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private authService: AuthenticationService
  ) {
    this.registerForm = this.fb.group({
      // Required for API
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      crm: ['', Validators.required],
      cep: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      street: ['', Validators.required],
      number: ['', Validators.required],
      neighborhood: ['', Validators.required],

      // Optional for API
      phone: [''],
      city: [''],
      state: [''],
      complement: ['']
    });
  }


  loadClinics(): void {
    this.apiService.getClinics().pipe(
      catchError(() => {
        return of([]);
      })
    ).subscribe({
      next: (response: any) => {
        if (Array.isArray(response) && response.length > 0) {
          this.availableClinics = response.map((clinic: { id: number; name: string }) => ({
            id: clinic.id,
            name: clinic.name
          }));

          const storedClinicId = localStorage.getItem('clinicId');
          if (storedClinicId) {
            const clinicId = parseInt(storedClinicId, 10);
            if (!isNaN(clinicId)) {
              const clinic = this.availableClinics.find(c => c.id === clinicId);
              if (clinic) {
                this.selectedDoctor.clinicId = clinicId;
                this.selectedClinicName = clinic.name;
              }
            }
          }
        } else {
          this.availableClinics = [];
        }
      },
      error: () => {
        this.availableClinics = [];
      }
    });
  }

  initializeTimeOptions(): void {
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        this.timeOptions.push(timeStr);
      }
    }
  }

  loadSpecialties(): void {
    this.availableSpecialties = Object.keys(Speciality)
      .filter(key => isNaN(Number(key)))
      .map((key: string) => {
        const enumValue = Speciality[key as keyof typeof Speciality] as Speciality;
        return {
          value: enumValue,
          label: SPECIALITY_NAMES[enumValue]
        };
      });
  }

  loadHealthPlans(): void {
    this.apiService.getHealthPlans().pipe(
      catchError(() => {
        return of([]);
      })
    ).subscribe({
      next: (response: any) => {
        if (Array.isArray(response) && response.length > 0) {
          this.availablePlans = response.map((plan: { id: number; name: string }) => ({
            id: plan.id,
            name: plan.name
          }));
        } else {
          this.availablePlans = [];
        }
      },
      error: () => {
        this.availablePlans = [];
      }
    });
  }


  onSubmit(): void {

    const storedClinicId = localStorage.getItem('clinicId');
    if (storedClinicId) {
      const clinicId = parseInt(storedClinicId, 10);
      if (!isNaN(clinicId)) {
        this.selectedDoctor.clinicId = clinicId;
      }
    }

    if (!this.selectedDoctor.clinicId) {
      alert('Erro: Não foi possível identificar a clínica. Por favor, faça login novamente.');
      return;
    }

    // Validate only fields required by the API (city and state are optional)
    const criticalFields = ['fullName', 'email', 'password', 'crm', 'cep', 'street', 'number', 'neighborhood'];
    const missingFields: string[] = [];

    criticalFields.forEach(field => {
      const control = this.registerForm.get(field);
      if (control && (control.invalid || !control.value || (typeof control.value === 'string' && !control.value.trim()))) {
        missingFields.push(field);
        control.markAsTouched();
      }
    });

    if (missingFields.length > 0) {
      const fieldNames: { [key: string]: string } = {
        'fullName': 'Nome Completo',
        'email': 'Email',
        'password': 'Senha',
        'crm': 'CRM',
        'cep': 'CEP',
        'street': 'Rua',
        'number': 'Número',
        'neighborhood': 'Bairro'
      };
      const missingFieldNames = missingFields.map(f => fieldNames[f] || f);
      alert(`Por favor, preencha os seguintes campos obrigatórios: ${missingFieldNames.join(', ')}`);
      return;
    }

    // Validate required fields
    if (!this.selectedDoctor.specialties || this.selectedDoctor.specialties.length === 0) {
      alert('Por favor, selecione pelo menos uma especialidade.');
      return;
    }


    // Validate schedule before submitting
    if (!this.isScheduleValid()) {
      alert('Por favor, corrija os erros nos horários de atendimento antes de continuar.');
      // Find first invalid day and open it for editing
      const invalidDay = this.weeklySchedule.find(day => !this.isDayScheduleValid(day));
      if (invalidDay) {
        invalidDay.editing = true;
      }
      return;
    }

    const scheduleData = this.getScheduleData();
    if (scheduleData.length > 0 && !this.selectedDoctor.clinicId) {
      alert('Erro: Clínica não identificada. Por favor, faça login novamente.');
      return;
    }

    const formValue = this.registerForm.value;
    const password = formValue.password;
    const email = formValue.email;
    const fullName = formValue.fullName;
    const cep = formValue.cep.replace(/\D/g, '');
    const address = `${formValue.street}, ${formValue.number}${formValue.complement ? ', ' + formValue.complement : ''} - ${formValue.neighborhood}`;

    const selectedSpecialty = this.selectedDoctor.specialties[0];
    const specialtyEnumValue = this.availableSpecialties.find(sp => sp.label === selectedSpecialty)?.value || Speciality.General;


    this.isSubmitting = true;

    const currentDate = new Date().toISOString();
    const deletedAt = this.selectedDoctor.status === 'inactive' ? currentDate : '';

    const user: Users = {
      name: fullName,
      email: email,
      passwordHash: password,
      phone: formValue.phone || undefined,
      role: 'doctor',
      cep: cep,
      state: formValue.state || undefined,
      city: formValue.city || undefined,
      address: address,
      profilePhotoUrl: '',
      createdAt: currentDate,
      updatedAt: currentDate,
      deletedAt: deletedAt
    };

    const credentialsUser = {
      email: email,
      password: password
    };

    this.authService.signup(user)
      .pipe(take(1))
      .subscribe({
        next: (userResponse) => {
          const userId = userResponse?.user?.id || userResponse?.id;
          if (!userId) {
            this.isSubmitting = false;
            alert('Erro: Não foi possível obter o ID do usuário');
            return;
          }

          this.continueWithAuthRegister(userId, formValue, specialtyEnumValue, scheduleData);
        },
        error: (error) => {
          this.isSubmitting = false;
          const errorMessage = error.error?.error || 'Erro ao criar usuário no banco de dados';
          alert(`Erro: ${errorMessage}`);
        }
      });
  }

  private continueWithAuthRegister(
  userId: number,
  formValue: any,
  specialtyEnumValue: Speciality,
  scheduleData: any[]
): void {

  // STEP 1: Criar vínculo ClinicUser (role = 1 = médico)
  if (this.selectedDoctor.clinicId) {
    this.apiService.createClinicUser({
      clinicId: this.selectedDoctor.clinicId,
      userId: userId,
      role: 1
    })
    .pipe(
      take(1),
      catchError(() => of(null)) // Continua mesmo com erro
    )
    .subscribe();
  }

  // STEP 2: Criar Doctor
  this.apiService.createDoctor({
    userId: userId,
    crm: formValue.crm,
    specialty: specialtyEnumValue
  })
  .pipe(
    take(1),
    catchError(() => of(null))
  )
  .subscribe({
    next: () => {
      this.apiService.getDoctorByUserId(userId)
        .pipe(
          take(1),
          catchError(() => of(null))
        )
        .subscribe({
          next: (doctor) => {
            if (!doctor || !doctor.id) {
              this.finishSuccess();
              return;
            }

            const doctorId = doctor.id;

            // STEP 3: Criar vínculos com convênios
            const healthPlanObservables =
              this.selectedPlanIds.length > 0
                ? this.selectedPlanIds.map(healthPlanId =>
                    this.apiService.createDoctorHealthPlan({
                      doctorId,
                      healthPlanId
                    }).pipe(catchError(() => of(null)))
                  )
                : [];

            // STEP 4: Criar agenda
            const scheduleObservables =
              scheduleData.length > 0 && this.selectedDoctor.clinicId
                ? scheduleData.map(schedule =>
                    this.apiService.createSchedule({
                      doctorId,
                      clinicId: this.selectedDoctor.clinicId!,
                      weekday: schedule.dayOfWeek,
                      startTime: `${schedule.startTime}:00`,
                      endTime: `${schedule.endTime}:00`,
                      available: schedule.isActive ?? true
                    }).pipe(catchError(() => of(null)))
                  )
                : [];

            const all = [...healthPlanObservables, ...scheduleObservables];

            if (all.length > 0) {
              forkJoin(all).subscribe(() => this.finishSuccess());
            } else {
              this.finishSuccess();
            }
          },
          error: (error) => {
            this.isSubmitting = false;
            const msg = error.error?.error || 'Erro ao obter ID do médico';
            alert(`Erro: ${msg}`);
          }
        });
    },
    error: (error) => {
      this.isSubmitting = false;
      const msg = error.error?.error || 'Erro ao criar perfil do médico';
      alert(`Erro: ${msg}`);
    }
  });
}

private finishSuccess(): void {
  this.isSubmitting = false;
  this.showSuccess = true;
  setTimeout(() => {
    this.showSuccess = false;
    this.resetForm();
  }, 3000);
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

  private resetForm(): void {
    this.registerForm.reset();
    this.selectedDoctor = {
      plans: [],
      specialties: [],
      status: 'active',
      clinicId: null
    };
    this.selectedPlanIds = [];
    this.weeklySchedule.forEach(day => {
      day.enabled = false;
      day.timeRanges = [];
      day.editing = false;
    });
  }

  toggleSelection(item: string | { value: Speciality; label: string } | { id: number; name: string }, field: 'plans' | 'specialties', event: Event) {
    event.stopPropagation();

    if (field === 'plans') {
      // Handle health plans with id and name
      if (typeof item === 'object' && 'id' in item && 'name' in item) {
        const plan = item as { id: number; name: string };
        const planName = plan.name;
        const index = this.selectedDoctor.plans.indexOf(planName);
        const idIndex = this.selectedPlanIds.indexOf(plan.id);

        if (index >= 0) {
          this.selectedDoctor.plans.splice(index, 1);
          this.selectedPlanIds.splice(idIndex, 1);
        } else {
          this.selectedDoctor.plans.push(planName);
          this.selectedPlanIds.push(plan.id);
        }
      }
    } else {
      // Handle specialties
      const targetList = this.selectedDoctor[field];
      let valueToAdd: string;

      if (typeof item === 'string') {
        valueToAdd = item;
      } else if (typeof item === 'object' && 'label' in item) {
        valueToAdd = item.label;
      } else {
        return; // Invalid item type
      }

      const index = targetList.indexOf(valueToAdd);
      if (index >= 0) {
        targetList.splice(index, 1);
      } else {
        targetList.push(valueToAdd);
      }
    }
  }

  selectStatus(status: string, event: MouseEvent): void {
    event.stopPropagation();
    this.selectedDoctor.status = status as 'active' | 'inactive';
    this.statusOpen = false;
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

  /* ============================================================================
     SCHEDULE MANAGEMENT
     ========================================================================== */

  toggleDayEnabled(day: DaySchedule): void {
    day.enabled = !day.enabled;
    if (!day.enabled) {
      day.timeRanges = [];
      day.editing = false;
    } else if (day.timeRanges.length === 0) {
      // Add default time range when enabling
      this.addTimeRange(day);
      day.editing = true; // Start in edit mode when first enabled
    }
  }

  toggleDayEdit(day: DaySchedule): void {
    if (day.editing) {
      // When closing edit mode, validate and sort
      if (this.isDayScheduleValid(day)) {
        this.sortDayTimeRanges(day);
        day.editing = false;
      } else {
        // Keep in edit mode if there are errors
        alert('Por favor, corrija os erros nos horários antes de salvar.');
      }
    } else {
      day.editing = true;
    }
  }

  getDayShortName(dayOfWeek: number): string {
    const dayNames: { [key: number]: string } = {
      1: 'Seg',
      2: 'Ter',
      3: 'Qua',
      4: 'Qui',
      5: 'Sex',
      6: 'Sáb',
      7: 'Dom'
    };
    return dayNames[dayOfWeek] || '';
  }

  addTimeRange(day: DaySchedule): void {
    day.timeRanges.push({
      startTime: '08:00',
      endTime: '12:00'
    });
  }

  removeTimeRange(day: DaySchedule, index: number): void {
    day.timeRanges.splice(index, 1);
  }

  getScheduleData(): any[] {
    const scheduleData: any[] = [];
    this.weeklySchedule.forEach(day => {
      if (day.enabled && day.timeRanges.length > 0) {
        day.timeRanges.forEach(range => {
          scheduleData.push({
            dayOfWeek: day.dayOfWeek,
            startTime: range.startTime,
            endTime: range.endTime,
            isActive: true
          });
        });
      }
    });
    return scheduleData;
  }

  isTimeRangeValid(range: TimeRange): boolean {
    if (!range.startTime || !range.endTime) return false;
    return range.startTime < range.endTime;
  }

  // Convert time string (HH:MM) to minutes for comparison
  private timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  // Check if two time ranges overlap
  private rangesOverlap(range1: TimeRange, range2: TimeRange): boolean {
    const start1 = this.timeToMinutes(range1.startTime);
    const end1 = this.timeToMinutes(range1.endTime);
    const start2 = this.timeToMinutes(range2.startTime);
    const end2 = this.timeToMinutes(range2.endTime);

    // Ranges overlap if one starts before the other ends
    return (start1 < end2 && start2 < end1);
  }

  // Get validation errors for a specific time range in a day
  getTimeRangeErrors(day: DaySchedule, rangeIndex: number): string[] {
    const errors: string[] = [];
    const range = day.timeRanges[rangeIndex];

    if (!range) return errors;

    // Check if start < end
    if (!this.isTimeRangeValid(range)) {
      errors.push('Horário de início deve ser anterior ao horário de término');
      return errors; // Return early if basic validation fails
    }

    // Check for overlaps with other ranges in the same day
    for (let i = 0; i < day.timeRanges.length; i++) {
      if (i !== rangeIndex) {
        const otherRange = day.timeRanges[i];
        if (this.rangesOverlap(range, otherRange)) {
          errors.push(`Sobreposição com ${otherRange.startTime} - ${otherRange.endTime}`);
          break; // Only show one overlap error at a time
        }
      }
    }

    return errors;
  }

  // Check if a day has any validation errors
  isDayScheduleValid(day: DaySchedule): boolean {
    if (!day.enabled || day.timeRanges.length === 0) {
      return true; // Empty days are valid
    }

    // Check each range
    for (let i = 0; i < day.timeRanges.length; i++) {
      const errors = this.getTimeRangeErrors(day, i);
      if (errors.length > 0) {
        return false;
      }
    }

    return true;
  }

  // Check if entire schedule is valid
  isScheduleValid(): boolean {
    return this.weeklySchedule.every(day => this.isDayScheduleValid(day));
  }

  // Auto-sort time ranges by start time
  sortDayTimeRanges(day: DaySchedule): void {
    day.timeRanges.sort((a, b) => {
      return this.timeToMinutes(a.startTime) - this.timeToMinutes(b.startTime);
    });
  }
}
