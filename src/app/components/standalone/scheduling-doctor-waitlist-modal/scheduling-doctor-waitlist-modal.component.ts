import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import type { DoctorSummary } from '../scheduling-doctor-search-list/scheduling-doctor-search-list.component';

interface WaitlistOption {
  date: string;
  time: string;
  dayOfWeek: string;
  available: boolean;
  reason?: string;
}

@Component({
  selector: 'med-scheduling-doctor-waitlist-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './scheduling-doctor-waitlist-modal.component.html',
  styleUrl: './scheduling-doctor-waitlist-modal.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class SchedulingDoctorWaitlistModalComponent {
  @Input() doctor!: DoctorSummary;
  @Input() isOpen = false;
  @Input() appointmentType: 'local' | 'remote' = 'local';
  @Output() close = new EventEmitter<void>();
  @Output() selectSlot = new EventEmitter<{ date: string; time: string; type: 'local' | 'remote' }>();

  selectedPreference: 'earliest' | 'morning' | 'afternoon' | 'evening' = 'earliest';
  notifyOnCancellation = true;
  emailForNotification = '';
  phoneForNotification = '';

  closeModal(): void {
    this.close.emit();
  }

  getEarliestSlots(): WaitlistOption[] {
    const slots: WaitlistOption[] = [];
    const today = new Date();
    
    // Generate next 14 days with some available slots
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const dayOfWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'][date.getDay()];
      const dateString = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      
      // Mock available slots based on preference
      const times = this.getTimesByPreference();
      
      times.forEach((time, index) => {
        const isAvailable = Math.random() > 0.6; // 40% available
        slots.push({
          date: dateString,
          time: time,
          dayOfWeek: dayOfWeek,
          available: isAvailable,
          reason: isAvailable ? undefined : index % 2 === 0 ? 'Ocupado' : 'Feriado'
        });
      });
    }
    
    return slots.filter(s => s.available).slice(0, 6); // Return first 6 available
  }

  getTimesByPreference(): string[] {
    switch (this.selectedPreference) {
      case 'morning':
        return ['08:00', '09:00', '10:00', '11:00'];
      case 'afternoon':
        return ['13:00', '14:00', '15:00', '16:00'];
      case 'evening':
        return ['17:00', '18:00', '19:00', '20:00'];
      default:
        return ['08:00', '10:00', '13:00', '15:00', '17:00', '19:00'];
    }
  }

  onSelectSlot(slot: WaitlistOption): void {
    this.selectSlot.emit({
      date: slot.date,
      time: slot.time,
      type: this.appointmentType
    });
    this.closeModal();
  }

  joinWaitlist(): void {
    if (!this.emailForNotification && !this.phoneForNotification) {
      alert('Por favor, forneça pelo menos um meio de contato (email ou telefone).');
      return;
    }

    const preference = this.selectedPreference === 'earliest' ? 'mais cedo possível' : this.selectedPreference;
    
    alert(
      `✅ Você foi adicionado à lista de espera!\n\n` +
      `Doutor: ${this.doctor.name}\n` +
      `Preferência: ${preference}\n` +
      `Tipo: ${this.appointmentType === 'local' ? 'Presencial' : 'Online'}\n\n` +
      `Você será notificado por ${this.emailForNotification ? 'email' : 'telefone'} quando houver uma vaga disponível.`
    );
    
    this.closeModal();
  }

  getNextAvailableSlot(): WaitlistOption | null {
    const slots = this.getEarliestSlots();
    return slots.length > 0 ? slots[0] : null;
  }

  get appointmentTypeLabel(): string {
    return this.appointmentType === 'local' ? 'Presencial' : 'Online';
  }
}
