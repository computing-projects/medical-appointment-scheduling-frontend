// Shared appointment-related interfaces
export type AppointmentStatus = 'Confirmada' | 'Pendente' | 'Cancelada' | 'Realizada' | 'Aguardando';
export type AppointmentType = 'Online' | 'Presencial';

export interface BaseAppointment {
  id: number;
  date: string;
  time: string;
  especialidade: string;
  appointmentType: AppointmentType;
  status: AppointmentStatus;
  appointmentLink?: string;
  reason?: string;
}

export interface CalendarAppointment {
  id: number;
  time: string;
  client: string;
  type: string;
  status: AppointmentStatus;
  specialty?: string;
  duration?: string;
}

export interface AppointmentHistory {
  date: string;
  type: string;
}

export interface PatientDetails {
  id: number;
  patientName: string;
  patientContact: string;
  patientAge: number;
  especialidade: string;
  appointmentType: AppointmentType;
  appointmentStatus: string;
  appointmentLink?: string;
  reason?: string;
  dataHora: string;
  patientAppointmentHistory?: AppointmentHistory[];
}

export interface DoctorDetails {
  id: number;
  doctorName: string;
  doctorPhoto: string;
  doctorContact: string;
  doctorAge: number;
  especialidade: string;
  crm: string;
  review: number;
  appointmentType: AppointmentType;
  appointmentStatus: string;
  appointmentLink?: string;
  reason?: string;
  dataHora: string;
  history?: AppointmentHistory[];
}

