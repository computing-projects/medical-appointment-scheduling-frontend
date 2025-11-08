import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { DoctorSummary } from '../scheduling-doctor-search-list/scheduling-doctor-search-list.component';
import { SchedulingDoctorAppointmentModalComponent } from '../scheduling-doctor-appointment-modal/scheduling-doctor-appointment-modal.component';
import { SchedulingDoctorWaitlistModalComponent } from '../scheduling-doctor-waitlist-modal/scheduling-doctor-waitlist-modal.component';

interface TimeSlot {
  time: string;
  available: boolean;
  type: 'local' | 'remote';
}

interface DaySchedule {
  date: Date;
  dateString: string;
  dayName: string;
  dayNumber: number;
  slots: TimeSlot[];
}

const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

@Component({
  selector: 'med-scheduling-doctor-booking',
  standalone: true,
  imports: [CommonModule, SchedulingDoctorAppointmentModalComponent, SchedulingDoctorWaitlistModalComponent],
  templateUrl: './scheduling-doctor-booking.component.html',
  styleUrl: './scheduling-doctor-booking.component.scss',
  encapsulation: ViewEncapsulation.None
})

export class SchedulingDoctorBookingComponent implements OnInit {
  @Input() doctor!: DoctorSummary;

  appointmentType: 'local' | 'remote' = 'local';
  selectedSlot: { day: DaySchedule; slot: TimeSlot } | null = null;
  
  // Generate next 7 days of schedule
  weekSchedule: DaySchedule[] = [];
  
  // Modal control
  isModalOpen = false;
  modalAppointmentDetails: any = null;
  
  // Waitlist modal control
  isWaitlistModalOpen = false;

  ngOnInit(): void {
    this.generateWeekSchedule();
  }

  generateWeekSchedule(): void {
    this.weekSchedule = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const daySchedule: DaySchedule = {
        date: date,
        dateString: `${date.getDate()} ${MONTHS[date.getMonth()]}`,
        dayName: WEEKDAYS[date.getDay()],
        dayNumber: date.getDate(),
        slots: this.generateDaySlots(date)
      };
      
      this.weekSchedule.push(daySchedule);
    }
  }

  generateDaySlots(date: Date): TimeSlot[] {
    const slots: TimeSlot[] = [];
    const timeSlots = [
      '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', 
      '11:00', '11:30', '13:00', '13:30', '14:00', '14:30',
      '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
    ];

    // Mock: randomly mark some slots as unavailable
    // In real app, this would come from backend
    const occupiedSlots = this.getMockOccupiedSlots(date);

    timeSlots.forEach(time => {
      const isOccupied = occupiedSlots.includes(time);
      slots.push({
        time: time,
        available: !isOccupied,
        type: this.appointmentType
      });
    });

    return slots;
  }

  getMockOccupiedSlots(date: Date): string[] {
    // Mock occupied slots (in production, fetch from backend)
    const day = date.getDay();
    const dateNum = date.getDate();
    
    // Different patterns for different days
    if (day === 0 || day === 6) return []; // Weekends free
    if (dateNum % 2 === 0) {
      return ['09:00', '10:00', '14:00', '15:30'];
    }
    return ['08:30', '11:00', '13:30', '16:00'];
  }

  setAppointmentType(type: 'local' | 'remote'): void {
    this.appointmentType = type;
    this.selectedSlot = null;
    this.generateWeekSchedule();
  }

  selectSlot(day: DaySchedule, slot: TimeSlot): void {
    if (!slot.available) return;
    this.selectedSlot = { day, slot };
  }

  confirmBooking(): void {
    if (!this.selectedSlot || !this.doctor) return;
    
    const { day, slot } = this.selectedSlot;
    
    this.modalAppointmentDetails = {
      doctor: this.doctor,
      date: day.dateString,
      time: slot.time,
      type: this.appointmentType
    };
    
    this.isModalOpen = true;
  }
  
  closeModal(): void {
    this.isModalOpen = false;
    this.modalAppointmentDetails = null;
  }
  
  onAppointmentConfirmed(data: any): void {
    console.log('Agendamento confirmado:', data);
    
    // Show success message
    alert(
      `✅ Agendamento confirmado com sucesso!\n\n` +
      `Doutor: ${data.appointmentDetails.doctor.name}\n` +
      `Data: ${data.appointmentDetails.date} às ${data.appointmentDetails.time}\n` +
      `Tipo: ${data.appointmentDetails.type === 'local' ? 'Presencial' : 'Online'}\n` +
      `Motivo: ${data.reason}\n\n` +
      `Você receberá uma confirmação por email em breve.`
    );
    
    // Reset selection
    this.selectedSlot = null;
  }

  getAvailableCount(day: DaySchedule): number {
    return day.slots.filter(s => s.available).length;
  }
  
  openWaitlistModal(): void {
    this.isWaitlistModalOpen = true;
  }
  
  closeWaitlistModal(): void {
    this.isWaitlistModalOpen = false;
  }
  
  onWaitlistSlotSelected(slotData: { date: string; time: string; type: 'local' | 'remote' }): void {
    console.log('Slot selected from waitlist:', slotData);
    
    // Find the corresponding day and slot in the calendar
    // In a real application, you would navigate to that date/time
    alert(
      `✅ Horário selecionado da lista de espera!\n\n` +
      `Data: ${slotData.date}\n` +
      `Horário: ${slotData.time}\n` +
      `Tipo: ${slotData.type === 'local' ? 'Presencial' : 'Online'}\n\n` +
      `Prossiga para confirmar o agendamento.`
    );
  }
}
