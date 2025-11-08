export interface Appointment {
  id: number;
  clientId: number;
  doctorId: number;
  clinicId: number;
  appointmentDate: string;
  appointmentTime: string;
  appointmentType: AppointmentType;
  status: AppointmentStatus;
  reason?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export enum AppointmentType {
  IN_PERSON = 'in_person',
  ONLINE = 'online'
}

export enum AppointmentStatus {
  SCHEDULED = 'scheduled',
  COMPLETED = 'completed',
  CANCELED = 'canceled',
  NO_SHOW = 'no_show'
}

export interface CreateAppointmentRequest {
  doctorId: number;
  appointmentDate: string;
  appointmentTime: string;
  appointmentType: AppointmentType;
  reason: string;
}

export interface WaitlistEntry {
  id: number;
  clientId: number;
  doctorId: number;
  reason: string;
  status: WaitlistStatus;
  createdAt: string;
}

export enum WaitlistStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELED = 'canceled'
}

export interface CreateWaitlistRequest {
  doctorId: number;
  reason: string;
}
