import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';

interface CalendarAppointment {
  time: string;
  client: string;
  type: string;
  status: 'Confirmada' | 'Pendente' | 'Cancelada' | 'Realizada';
  // Add other details needed for quick view or for a potential 'edit' modal
  id: number;
}

const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];
const DAY_NAMES_SHORT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

@Component({
  selector: 'med-perfil-doctor-calendar',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './perfil-doctor-calendar.component.html',
  styleUrl: './perfil-doctor-calendar.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class PerfilDoctorCalendarComponent implements OnInit {
  currentDate: Date = new Date(); // Tracks the currently displayed month/year
  daysInMonth: { date: Date | null, hasAppointments: boolean }[] = [];
  selectedDayAppointments: CalendarAppointment[] = [];
  selectedDate: Date | null = null;

  // Mock appointments data, keyed by YYYY-MM-DD
  mockAppointments: { [key: string]: CalendarAppointment[] } = {
    '2025-10-10': [
      { id: 1, time: '10:00', client: 'Alice Souza', type: 'Presencial', status: 'Confirmada' },
      { id: 2, time: '14:00', client: 'Bob Lima', type: 'Online', status: 'Pendente' }
    ],
    '2025-10-15': [
      { id: 3, time: '09:30', client: 'Charlie Brown', type: 'Presencial', status: 'Confirmada' }
    ],
    '2025-10-23': [ // Today's date for example
      { id: 4, time: '10:00', client: 'Ana Paula Costa', type: 'Presencial', status: 'Realizada' },
      { id: 5, time: '11:00', client: 'Carlos Eduardo Lima', type: 'Online', status: 'Confirmada' }
    ],
    '2025-11-05': [
      { id: 6, time: '16:00', client: 'Maria Clara', type: 'Presencial', status: 'Pendente' }
    ]
  };

  constructor() { }

  ngOnInit(): void {
    this.generateCalendar();
  }

  generateCalendar(): void {
    this.daysInMonth = [];
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    // Get the first day of the month
    const firstDayOfMonth = new Date(year, month, 1);
    // Get the day of the week (0 for Sunday, 1 for Monday, etc.)
    const startDay = firstDayOfMonth.getDay();

    // Get the number of days in the current month
    const daysCount = new Date(year, month + 1, 0).getDate();

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startDay; i++) {
      this.daysInMonth.push({ date: null, hasAppointments: false });
    }

    // Add days of the month
    for (let i = 1; i <= daysCount; i++) {
      const dayDate = new Date(year, month, i);
      const dateString = dayDate.toISOString().slice(0, 10); // YYYY-MM-DD
      this.daysInMonth.push({
        date: dayDate,
        hasAppointments: !!this.mockAppointments[dateString] // Check if there are appointments for this day
      });
    }
  }

  get currentMonthYear(): string {
    return `${MONTH_NAMES[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
  }

  get shortDayNames(): string[] {
    return DAY_NAMES_SHORT;
  }

  changeMonth(delta: number): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + delta);
    this.generateCalendar();
    this.selectedDate = null; // Clear selected day when changing month
    this.selectedDayAppointments = [];
  }

  selectDay(dayDate: Date | null): void {
    this.selectedDate = dayDate;
    this.selectedDayAppointments = [];
    if (dayDate) {
      const dateString = dayDate.toISOString().slice(0, 10);
      this.selectedDayAppointments = this.mockAppointments[dateString] || [];
    }
  }

  isToday(date: Date | null): boolean {
    if (!date) {
      return false;
    }
    return date.toDateString() === new Date().toDateString();
  }

  // Placeholder for opening a new appointment creation modal/form
  createNewAppointment(): void {
    console.log('Abrir modal para criar novo agendamento');
    // Here you would typically open a dedicated modal component for creating appointments
    alert('Funcionalidade de criar novo agendamento será implementada aqui!');
  }

  // Placeholder for opening an existing appointment's details/edit modal
  openAppointmentDetails(appointmentId: number): void {
    console.log(`Abrir detalhes do agendamento ID: ${appointmentId}`);
    // You could reuse PerfilAppointmentModalComponent or create a new one specific to doctor's editing needs
    alert(`Abrir detalhes/edição para agendamento ID ${appointmentId}`);
  }
}
