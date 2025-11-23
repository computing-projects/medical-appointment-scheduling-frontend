export interface Doctor {
  id: number;
  userId: number;
  crm: string;
  specialty: Specialty;
  user?: {
    id: number;
    name: string;
    email: string;
    phone?: string;
  };
  description?: string;
  averageConsultationTime?: number;
  healthPlans?: HealthPlan[];
}

export enum Specialty {
  CARDIOLOGY = 'Cardiology',
  DERMATOLOGY = 'Dermatology',
  ENDOCRINOLOGY = 'Endocrinology',
  GASTROENTEROLOGY = 'Gastroenterology',
  NEUROLOGY = 'Neurology',
  ORTHOPEDICS = 'Orthopedics',
  PEDIATRICS = 'Pediatrics',
  PSYCHIATRY = 'Psychiatry',
  GENERAL = 'General',
  UROLOGY = 'Urology'
}

export interface HealthPlan {
  id: number;
  name: string;
}

export interface DoctorFilter {
  specialty?: Specialty;
  healthPlan?: string;
  name?: string;
}
