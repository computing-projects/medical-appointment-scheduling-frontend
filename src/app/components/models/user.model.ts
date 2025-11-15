export enum Roles {
  CLIENT = 'client',
  DOCTOR = 'doctor',
  ADMIN = 'admin',
}

export interface Users {
  id?: number;
  name: string;
  email: string;
  passwordHash: string;
  phone?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  address: string;
  cep: string;
  deletedAt: string;
  profilePhotoUrl?: string;
  city?: string;
  state?: string;
}

export interface Clients {
  // id: number;
  userId: number | undefined;
  rg: string;
  cpf: string;
  phone?: string;
  birthDate: string | null;
}

export interface Doctors {
  // id: number;
  // userId: number;
  crm: string;
  specialty: string;
}

export interface ClinicUsers {
  // id: number;
  clinicId: number;
  userId: number;
  role: string;
}

export interface AuthState {
  user: Users | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface Clinics {
  // id: number;
  name: string;
  address: string;
  cnpj: string;
  email: string;
  phone: string;
  website?: string;
  cep: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
