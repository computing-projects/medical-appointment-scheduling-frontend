import { Speciality } from './../../models/api-models';
import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

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

interface Doctor {
  id: number;
  photo: string;
  name: string;
  cpf : string;
  crm: string;
  cidade: string;
  estado: string;
  cep: string;
  plans: string[];
  specialtys: string[];
  email: string;
  phone: string;
  schedule?: any[];
  status: 'active' | 'inactive';
  patientsCount: number;
  rating: number;
}

@Component({
  selector: 'med-manager-doctor-edit',
  standalone: true,
  imports: [CommonModule, FormsModule ],
  templateUrl: './manager-doctor-edit.component.html',
  styleUrl: './manager-doctor-edit.component.scss'
})
export class ManagerDoctorEditComponent implements OnInit {
  doctors: Doctor[] = [];
  filteredDoctors: Doctor[] = [];
  searchTerm = '';
  filterStatus: 'all' | 'active' | 'inactive' = 'all';
  selectedDoctor: Doctor | null = null;
  showViewModal = false;
  showEditModal = false;
  showDeleteConfirm = false;
  plansOpen = false;
  specialtiesOpen = false;
  statusOpen = false;

  plans: string[] = [];
  specialties: { value: Speciality; label: string }[] = [];
  statusList: { label: string; value: string }[] = [];

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

  constructor(private apiService: ApiService) {
    this.initializeTimeOptions();
  }

  initializeTimeOptions(): void {
    // Generate time options from 00:00 to 23:30 in 30-minute intervals
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        this.timeOptions.push(timeStr);
      }
    }
  }

  ngOnInit(): void {
    this.loadHealthPlans();
    this.loadMockDoctors();
    this.applyFilters();
  }

  loadHealthPlans(): void {
    this.apiService.getHealthPlans().pipe(
      catchError(error => {
        console.error('Error loading health plans:', error);
        console.error('Error details:', error.error, error.status, error.statusText);
        // Return empty array if API fails - no fallback to mock data
        return of([]);
      })
    ).subscribe({
      next: (response: any) => {
        // Check if response is an array
        if (Array.isArray(response) && response.length > 0) {
          // Map the API response (array of {id, name}) to just the names
          this.plans = response.map((plan: { id: number; name: string }) => plan.name);
        } else {
          console.warn('Unexpected response format or empty response:', response);
          this.plans = [];
        }
      },
      error: (error) => {
        console.error('Subscription error:', error);
        this.plans = [];
      }
    });
  }

  loadMockDoctors(): void {
    // Plans are loaded from API in loadHealthPlans() - no mock fallback

    // Initialize specialties from enum
    this.specialties = Object.keys(Speciality)
      .filter(key => isNaN(Number(key))) // Filter out numeric keys, keep string keys
      .map((key: string) => {
        const enumValue = Speciality[key as keyof typeof Speciality] as Speciality;
        return {
          value: enumValue,
          label: SPECIALITY_NAMES[enumValue]
        };
      });
    this.statusList = [
      { label: 'Ativo', value: 'active' },
      { label: 'Inativo', value: 'inactive' }
    ];
    this.doctors = [
      {
        id: 1,
        photo: 'https://i.pravatar.cc/150?img=12',
        name: 'Dr. Carlos Eduardo Silva',
        specialtys: ['Cardiologia'],
        plans: ['Unimed', 'Amil'],
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '13506000',
        cpf: '12345678912345',
        crm: 'SP/123456',
        email: 'carlos.silva@clinic.com',
        phone: '(11) 98765-4321',
        status: 'active',
        schedule: [
          { dayOfWeek: 1, startTime: '08:00', endTime: '12:00', isActive: true },
          { dayOfWeek: 1, startTime: '14:00', endTime: '18:00', isActive: true },
          { dayOfWeek: 2, startTime: '08:00', endTime: '12:00', isActive: true },
          { dayOfWeek: 2, startTime: '14:00', endTime: '18:00', isActive: true }
        ],
        patientsCount: 245,
        rating: 4.8
      },
      {
        id: 2,
        photo: 'https://i.pravatar.cc/150?img=5',
        name: 'Dra. Maria Santos Oliveira',
       specialtys: ['Pediatria'],
        crm: 'SP/789012',
        plans: ['Bradesco Saúde', 'Particular'],
        cidade: 'Campinas',
        estado: 'SP',
        cep: '13010000',
        cpf: '98765432198765',
        email: 'maria.santos@clinic.com',
        phone: '(11) 97654-3210',
        status: 'active',
        schedule: [
          { dayOfWeek: 3, startTime: '09:00', endTime: '12:00', isActive: true },
          { dayOfWeek: 3, startTime: '13:00', endTime: '17:00', isActive: true },
          { dayOfWeek: 4, startTime: '09:00', endTime: '12:00', isActive: true }
        ],
        patientsCount: 312,
        rating: 4.9
      },
      {
        id: 3,
        photo: 'https://i.pravatar.cc/150?img=33',
        name: 'Dr. João Paulo Costa',
        specialtys: ['Ortopedia'],
        crm: 'SP/345678',
        plans: ['SulAmérica', 'Hapvida'],
        cidade: 'Santos',
        estado: 'SP',
        cep: '11010000',
        cpf: '45678912345678',
        email: 'joao.costa@clinic.com',
        phone: '(11) 96543-2109',
        status: 'inactive',
        schedule: [
          { dayOfWeek: 1, startTime: '08:00', endTime: '12:00', isActive: true },
          { dayOfWeek: 2, startTime: '08:00', endTime: '12:00', isActive: true },
          { dayOfWeek: 3, startTime: '08:00', endTime: '12:00', isActive: true },
          { dayOfWeek: 4, startTime: '08:00', endTime: '12:00', isActive: true },
          { dayOfWeek: 5, startTime: '08:00', endTime: '12:00', isActive: true }
        ],
        patientsCount: 187,
        rating: 4.6
      },
      {
        id: 4,
        photo: 'https://i.pravatar.cc/150?img=20',
        name: 'Dra. Ana Paula Ferreira',
        specialtys: ['Dermatologia'],
        crm: 'SP/901234',
        email: 'ana.ferreira@clinic.com',
        phone: '(11) 95432-1098',
        plans: ['NotreDame Intermédica', 'Porto Seguro Saúde'],
        cidade: 'Ribeirão Preto',
        estado: 'SP',
        cep: '14010000',
        cpf: '32165498732165',
        schedule: [
          { dayOfWeek: 2, startTime: '10:00', endTime: '13:00', isActive: true },
          { dayOfWeek: 4, startTime: '10:00', endTime: '13:00', isActive: true }
        ],
        status: 'active',
        patientsCount: 198,
        rating: 4.7
      },
      {
        id: 5,
        photo: 'https://i.pravatar.cc/150?img=68',
        name: 'Dr. Roberto Almeida Lima',
        specialtys: ['Neurologia'],
        crm: 'SP/567890',
        email: 'roberto.lima@clinic.com',
        phone: '(11) 94321-0987',
        status: 'active',
        plans: ['Unimed', 'Amil', 'Particular'],
        cidade: 'Sorocaba',
        estado: 'SP',
        cep: '18010000',
        cpf: '78912345678912',
        schedule: [
          { dayOfWeek: 1, startTime: '08:00', endTime: '12:00', isActive: true },
          { dayOfWeek: 1, startTime: '14:00', endTime: '18:00', isActive: true },
          { dayOfWeek: 3, startTime: '08:00', endTime: '12:00', isActive: true },
          { dayOfWeek: 3, startTime: '14:00', endTime: '18:00', isActive: true },
          { dayOfWeek: 5, startTime: '08:00', endTime: '12:00', isActive: true }
        ],
        patientsCount: 156,
        rating: 4.5
      }
    ];
  }

  applyFilters(): void {
    this.filteredDoctors = this.doctors.filter(doctor => {
      const matchesSearch = !this.searchTerm ||
        doctor.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        doctor.specialtys.filter(a => a.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        doctor.crm.toLowerCase().includes(this.searchTerm.toLowerCase()))

      const matchesStatus = this.filterStatus === 'all' || doctor.status === this.filterStatus;

      return matchesSearch && matchesStatus;
    });
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onStatusFilterChange(): void {
    this.applyFilters();
  }

  viewDoctor(doctor: Doctor): void {
    this.selectedDoctor = doctor;
    this.showViewModal = true;
  }

  editDoctor(doctor: Doctor): void {
    this.selectedDoctor = { ...doctor };
    this.loadScheduleFromDoctor(doctor);
    this.showEditModal = true;
  }

  loadScheduleFromDoctor(doctor: Doctor): void {
    // Reset schedule
    this.weeklySchedule.forEach(day => {
      day.enabled = false;
      day.timeRanges = [];
    });

    // Load schedule from doctor if available
    if (doctor.schedule && Array.isArray(doctor.schedule)) {
      doctor.schedule.forEach((scheduleItem: any) => {
        const day = this.weeklySchedule.find(d => d.dayOfWeek === scheduleItem.dayOfWeek);
        if (day) {
          day.enabled = true;
          // Check if time range already exists
          const existingRange = day.timeRanges.find(
            r => r.startTime === scheduleItem.startTime && r.endTime === scheduleItem.endTime
          );
          if (!existingRange) {
            day.timeRanges.push({
              startTime: scheduleItem.startTime,
              endTime: scheduleItem.endTime
            });
          }
        }
      });
    }
  }

  confirmDelete(doctor: Doctor): void {
    this.selectedDoctor = doctor;
    this.showDeleteConfirm = true;
  }

  deleteDoctor(): void {
    if (this.selectedDoctor) {
      const index = this.doctors.findIndex(d => d.id === this.selectedDoctor!.id);
      if (index > -1) {
        this.doctors.splice(index, 1);
        this.applyFilters();
      }
      this.closeDeleteConfirm();
    }
  }

  saveEdit(): void {
    if (this.selectedDoctor) {
      // Validate schedule before saving
      if (!this.isScheduleValid()) {
        alert('Por favor, corrija os erros nos horários de atendimento antes de salvar.');
        // Find first invalid day and open it for editing
        const invalidDay = this.weeklySchedule.find(day => !this.isDayScheduleValid(day));
        if (invalidDay) {
          invalidDay.editing = true;
        }
        return;
      }

      // Save schedule to doctor
      this.selectedDoctor.schedule = this.getScheduleData();

      const index = this.doctors.findIndex(d => d.id === this.selectedDoctor!.id);
      if (index > -1) {
        this.doctors[index] = { ...this.selectedDoctor };
        this.applyFilters();
      }
      this.closeEditModal();
    }
  }

  toggleStatus(doctor: Doctor): void {
    const index = this.doctors.findIndex(d => d.id === doctor.id);
    if (index > -1) {
      this.doctors[index].status = this.doctors[index].status === 'active' ? 'inactive' : 'active';
      this.applyFilters();
    }
  }

  closeViewModal(): void {
    this.showViewModal = false;
    this.selectedDoctor = null;
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.selectedDoctor = null;
  }

  closeDeleteConfirm(): void {
    this.showDeleteConfirm = false;
    this.selectedDoctor = null;
  }

  getStarArray(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
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

  getDayName(dayOfWeek: number): string {
    // Backend enum: Monday=1, Tuesday=2, Wednesday=3, Thursday=4, Friday=5, Saturday=6, Sunday=7
    const dayNames: { [key: number]: string } = {
      1: 'Segunda-feira',
      2: 'Terça-feira',
      3: 'Quarta-feira',
      4: 'Quinta-feira',
      5: 'Sexta-feira',
      6: 'Sábado',
      7: 'Domingo'
    };
    return dayNames[dayOfWeek] || '';
  }

  getEmptyStarArray(rating: number): number[] {
    return Array(5 - Math.floor(rating)).fill(0);
  }

  toggleDropdown(field: 'plansOpen' | 'specialtiesOpen' | 'statusOpen') {
    this[field] = !this[field];
  }

  closeDropdown(field: 'plansOpen' | 'specialtiesOpen' | 'statusOpen') {
    // pequeno delay para não fechar antes de clicar
    setTimeout(() => this[field] = false, 50);
  }

  toggleSelection(item: string | { value: Speciality; label: string }, field: 'plans' | 'specialtys', event: Event) {
    event.stopPropagation();

    const list = this.selectedDoctor ? this.selectedDoctor[field] : [];

    let valueToAdd: string;
    if (typeof item === 'string') {
      valueToAdd = item;
    } else {
      // For specialties, store the enum value as string
      valueToAdd = SPECIALITY_NAMES[item.value];
    }

    const index = list.indexOf(valueToAdd);

    if (index >= 0) {
      list.splice(index, 1); // remove
    } else {
      list.push(valueToAdd); // adiciona
    }
  }

  getSpecialityLabel(value: string): string {
    // Find the enum value that matches this label
    const entry = Object.entries(SPECIALITY_NAMES).find(([_, label]) => label === value);
    return entry ? entry[1] : value;
  }

  selectStatus(st: string, event: MouseEvent) {
    event.stopPropagation();
    if (this.selectedDoctor) {
      this.selectedDoctor.status = st as 'active' | 'inactive';
    }
    this.statusOpen = false;
  }
}
