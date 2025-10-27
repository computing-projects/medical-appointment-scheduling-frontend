// Enums correspondentes aos SystemEnums da API
export enum AppointmentType {
  InPerson = 1,
  Online = 2
}

export enum AppointmentStatus {
  Scheduled = 1,
  Completed = 2,
  Canceled = 3,
  NoShow = 4
}

export enum WaitlistStatus {
  Pending = 1,
  Confirmed = 2,
  Canceled = 3
}

export enum Speciality {
  Cardiology = 1,
  Dermatology = 2,
  Endocrinology = 3,
  Gastroenterology = 4,
  Neurology = 5,
  Orthopedics = 6,
  Pediatrics = 7,
  Psychiatry = 8,
  General = 9
}

export enum HealthPlans {
  SUS = 1,
  Unimed = 2,
  Bradesco = 3,
  Amil = 4,
  Other = 5
}

// Interfaces correspondentes aos modelos da API
export interface User {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
  cep: string;
  address: string;
  phone?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface TokenDto {
  email: string;
  token: string;
}

export interface Doctor {
  id: number;
  userId: number;
  crm: string;
  specialty: Speciality;
}

export interface Appointment {
  id: number;
  clientId: number;
  doctorId: number;
  clinicId: number;
  scheduleId: number;
  appointmentDatetime: string;
  appointmentType: AppointmentType;
  status: AppointmentStatus;
  videoCallLink?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Waitlist {
  id: number;
  clientId: number;
  appointmentId: number;
  position: number;
  status: WaitlistStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Clinic {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Schedule {
  id: number;
  doctorId: number;
  clinicId: number;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Client {
  id: number;
  userId: number;
  rg: string;
  cpf: string;
  phone: string;
  birthDate: string;
}

export interface HealthPlan {
  id: number;
  name: string;
  type: HealthPlans;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: number;
  userId: number;
  title: string;
  message: string;
  channel: number;
  category: number;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: number;
  appointmentId: number;
  clientId: number;
  rating: number;
  comment?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Anamnese {
  id: number;
  appointmentId: number;
  clientId: number;
  symptoms: string;
  medicalHistory: string;
  medications: string;
  allergies: string;
  createdAt: string;
  updatedAt: string;
}

