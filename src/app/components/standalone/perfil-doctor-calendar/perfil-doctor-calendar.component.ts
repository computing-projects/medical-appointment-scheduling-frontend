import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarAppointment } from '../../shared/interfaces/appointment.interface';
import { MONTH_NAMES, DAY_NAMES_SHORT } from '../../shared/constants/calendar.constants';
import { DateUtils } from '../../shared/utils/date.utils';
import { StatusUtils } from '../../shared/utils/status.utils';

@Component({
  selector: 'med-perfil-doctor-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil-doctor-calendar.component.html',
  styleUrl: './perfil-doctor-calendar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PerfilDoctorCalendarComponent implements OnInit {
  currentDate: Date = new Date(); // Tracks the currently displayed month/year
  daysInMonth: { date: Date | null; hasAppointments: boolean }[] = [];
  selectedDayAppointments: CalendarAppointment[] = [];
  selectedDate: Date | null = null;

  // Mock appointments data, keyed by YYYY-MM-DD
  mockAppointments: { [key: string]: CalendarAppointment[] } = {
    '2025-10-10': [
      {
        id: 1,
        time: '10:00',
        client: 'Alice Souza',
        type: 'Presencial',
        status: 'Confirmada',
        specialty: 'Cardiologia',
        duration: '30 min',
      },
      {
        id: 2,
        time: '14:00',
        client: 'Bob Lima',
        type: 'Online',
        status: 'Pendente',
        specialty: 'Clínico Geral',
        duration: '45 min',
      },
      {
        id: 7,
        time: '16:00',
        client: 'Fernanda Silva',
        type: 'Presencial',
        status: 'Confirmada',
        specialty: 'Cardiologia',
        duration: '30 min',
      },
    ],
    '2025-10-15': [
      {
        id: 3,
        time: '09:30',
        client: 'Charlie Brown',
        type: 'Presencial',
        status: 'Confirmada',
        specialty: 'Pediatria',
        duration: '40 min',
      },
      {
        id: 8,
        time: '11:00',
        client: 'Rodrigo Alves',
        type: 'Online',
        status: 'Confirmada',
        specialty: 'Clínico Geral',
        duration: '30 min',
      },
    ],
    '2025-10-26': [
      // Today's date
      {
        id: 4,
        time: '10:00',
        client: 'Ana Paula Costa',
        type: 'Presencial',
        status: 'Realizada',
        specialty: 'Cardiologia',
        duration: '30 min',
      },
      {
        id: 5,
        time: '11:00',
        client: 'Carlos Eduardo Lima',
        type: 'Online',
        status: 'Confirmada',
        specialty: 'Clínico Geral',
        duration: '45 min',
      },
      {
        id: 9,
        time: '14:30',
        client: 'Juliana Mendes',
        type: 'Presencial',
        status: 'Pendente',
        specialty: 'Pediatria',
        duration: '30 min',
      },
    ],
    '2025-11-05': [
      {
        id: 6,
        time: '16:00',
        client: 'Maria Clara',
        type: 'Presencial',
        status: 'Pendente',
        specialty: 'Cardiologia',
        duration: '30 min',
      },
    ],
  };

  constructor() {}

  ngOnInit(): void {
    this.generateCalendar();
  }

  generateCalendar(): void {
    this.daysInMonth = [];
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    const startDay = DateUtils.getFirstDayOfMonth(year, month);
    const daysCount = DateUtils.getDaysInMonth(year, month);

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startDay; i++) {
      this.daysInMonth.push({ date: null, hasAppointments: false });
    }

    // Add days of the month
    for (let i = 1; i <= daysCount; i++) {
      const dayDate = new Date(year, month, i);
      const dateString = DateUtils.toISODateString(dayDate);
      this.daysInMonth.push({
        date: dayDate,
        hasAppointments: !!this.mockAppointments[dateString],
      });
    }
  }

  get currentMonthYear(): string {
    return `${MONTH_NAMES[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
  }

  get shortDayNames(): readonly string[] {
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
      const dateString = DateUtils.toISODateString(dayDate);
      this.selectedDayAppointments = this.mockAppointments[dateString] || [];
    }
  }

  isToday(date: Date | null): boolean {
    return DateUtils.isToday(date);
  }

  getAppointmentCount(date: Date | null): number {
    if (!date) return 0;
    const dateString = DateUtils.toISODateString(date);
    return this.mockAppointments[dateString]?.length || 0;
  }

  getStatusIcon(status: string): string {
    return StatusUtils.getStatusIcon(status);
  }

  getTodayStats() {
    const today = DateUtils.toISODateString(new Date());
    const todayAppts = this.mockAppointments[today] || [];
    return {
      total: todayAppts.length,
      confirmed: todayAppts.filter(a => a.status === 'Confirmada').length,
      pending: todayAppts.filter(a => a.status === 'Pendente').length,
      completed: todayAppts.filter(a => a.status === 'Realizada').length,
    };
  }

  getMonthStats() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    let total = 0;
    let daysWithAppointments = 0;

    Object.keys(this.mockAppointments).forEach(dateStr => {
      const date = new Date(dateStr);
      if (date.getFullYear() === year && date.getMonth() === month) {
        total += this.mockAppointments[dateStr].length;
        daysWithAppointments++;
      }
    });

    return { total, daysWithAppointments };
  }

  // Placeholder for opening an existing appointment's details/edit modal
  openAppointmentDetails(appointmentId: number): void {
    console.log(`Abrir detalhes do agendamento ID: ${appointmentId}`);
    // You could reuse PerfilAppointmentModalComponent or create a new one specific to doctor's editing needs
    alert(`Abrir detalhes/edição para agendamento ID ${appointmentId}`);
  }
}
