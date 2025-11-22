import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentStatus, CalendarAppointment } from '../../shared/interfaces/appointment.interface';
import { MONTH_NAMES, DAY_NAMES_SHORT } from '../../shared/constants/calendar.constants';
import { DateUtils } from '../../shared/utils/date.utils';
import { StatusUtils } from '../../shared/utils/status.utils';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { take } from 'rxjs';

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

  doctorCalendar: { [key: string]: CalendarAppointment[] } = {};

  constructor(private authService: AuthenticationService, private cdr: ChangeDetectorRef,) {}

  ngOnInit(): void {
    this.loadConsultas();
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
        hasAppointments: !!this.doctorCalendar[dateString],
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
      this.selectedDayAppointments = this.doctorCalendar[dateString] || [];
    }
  }

  isToday(date: Date | null): boolean {
    return DateUtils.isToday(date);
  }

  getAppointmentCount(date: Date | null): number {
    if (!date) return 0;
    const dateString = DateUtils.toISODateString(date);
    return this.doctorCalendar[dateString]?.length || 0;
  }

  getStatusIcon(status: string): string {
    return StatusUtils.getStatusIcon(status);
  }

  getTodayStats() {
    const today = DateUtils.toISODateString(new Date());
    const todayAppts = this.doctorCalendar[today] || [];
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

    Object.keys(this.doctorCalendar).forEach(dateStr => {
      const date = new Date(dateStr);
      if (date.getFullYear() === year && date.getMonth() === month) {
        total += this.doctorCalendar[dateStr].length;
        daysWithAppointments++;
      }
    });

    return { total, daysWithAppointments };
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

  loadConsultas() {
    this.authService.getDoctorCalendarById(1) //TODO: passar id do usuario
      .pipe(take(1))
      .subscribe({
        next: response => {
          console.log(response);
          this.doctorCalendar = this.mapToDoctorCalendar(response);
          console.log('Agenda carregado:', this.doctorCalendar);
          this.cdr.detectChanges();
        },
        error: err => {
          console.error('Erro no login:', err);
        },
      });
  }

  mapToDoctorCalendar(response: any): { [key: string]: CalendarAppointment[] } {
    const calendar: { [key: string]: CalendarAppointment[] } = {};
    
    Object.keys(response).forEach(date => {
      calendar[date] = response[date].map((item: any) => ({
        id: item.id,
        time: item.time,
        client: item.client,
        type: item.type,
        status: item.status,
        specialty: item.specialty,
        duration: item.duration
      }));
    });
    
    return calendar;
  }
}
