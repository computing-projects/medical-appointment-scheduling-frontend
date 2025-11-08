// Shared profile-related interfaces
export interface BaseProfile {
  photo: string;
  name: string;
  contact: string;
  age: number;
  email?: string;
  city?: string;
  cep?: string;
}

export interface UserProfile extends BaseProfile {
  lastName?: string;
  state: string;
  healthPlans: string[];
  cpf: string;
  consultas: number;
  exames: number;
  cirurgias: number;
  procedimentos: number;
  agendamentosCanceladosOuFaltados: number;
}

export interface DoctorProfile extends BaseProfile {
  lastName: string;
  specialty: string;
  crm: string;
  acceptedPlans: string[];
  availableHoursToday?: string;
  address?: string;
  bio?: string;
  review: number;
}

export interface DoctorSummary {
  id: number;
  photo: string;
  name: string;
  specialty: string;
  shortDescription: string;
  crm: string;
  contact: string;
  age: number;
  acceptedPlans: string[];
  review: number;
}

export interface MonthStats {
  consultas: number;
  exames: number;
  cirurgias: number;
  procedimentos: number;
  agendamentosCanceladosOuFaltados: number;
}

