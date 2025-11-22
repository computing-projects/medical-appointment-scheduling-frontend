export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    DIRECT_LOGIN: '/Auth/DirectLogin',
    REGISTER: '/Auth/Register',
    CURRENT_USER: '/Auth/CurrentUser'
  },

  // Doctor endpoints
  DOCTORS: {
    BASE: '/Doctors',
    GET_BY_ID: (id: number) => `/Doctors/GetById/${id}`,
    GET_BY_USER_ID: (userId: number) => `/Doctors/GetByUserId/${userId}`,
    GET_BY_FILTER: '/Doctors/GetDoctorsByFilter',
    CREATE: '/Doctors/Create'
  },

  // User endpoints
  USERS: {
    REGISTER: '/Users/Register'
  },

  // Appointment endpoints
  APPOINTMENTS: {
    SCHEDULE: '/Appointments/Schedule'
  },

  // Waitlist endpoints
  WAITLIST: {
    CREATE: '/Waitlist/Create',
    JOIN: '/Waitlist/JoinWaitlist'
  },

  // Health Plans endpoints
  HEALTH_PLANS: {
    BASE: '/HealthPlans'
  },

  // Clinic endpoints
  CLINICS: {
    BASE: '/Clinics'
  },

  // Clinic Users endpoints
  CLINIC_USERS: {
    GET_BY_USER_ID: (userId: number) => `/ClinicUsers/GetByUserId/${userId}`,
    CREATE: '/ClinicUsers/Create'
  },

  // Doctor Health Plans endpoints
  DOCTOR_HEALTH_PLANS: {
    CREATE: '/DoctorHealthPlans/Create'
  },

  // Schedule endpoints
  SCHEDULES: {
    CREATE: '/Schedules/Create'
  },

  CLIENTS: {
    GET_BY_ID: '/Clients/GetByUserId/'
  }

} as const;

