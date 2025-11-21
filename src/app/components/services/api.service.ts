import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';
import {  
  HealthPlan, 
  Clinic,
  CreateUserRequest,
  CreateDoctorRequest,
  CreateScheduleRequest,
  CreateClinicUserRequest,
  CreateDoctorHealthPlanRequest
} from '../models/api-models';
import { ClinicUsers } from '../models/user.model';
import { API_ENDPOINTS } from '../models/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    });
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}${API_ENDPOINTS.AUTH.DIRECT_LOGIN}`, credentials);
  }

  signup(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}${API_ENDPOINTS.AUTH.REGISTER}`, credentials, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  getDoctors(): Observable<any> {
    return this.http.get(`${this.baseUrl}${API_ENDPOINTS.DOCTORS.BASE}`, { headers: this.getHeaders() });
  }

  getDoctorById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}${API_ENDPOINTS.DOCTORS.GET_BY_ID(id)}`, { headers: this.getHeaders() });
  }

  getDoctorsByFilter(filter: any): Observable<any> {
    return this.http.post(`${this.baseUrl}${API_ENDPOINTS.DOCTORS.GET_BY_FILTER}`, filter, { headers: this.getHeaders() });
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.baseUrl}${API_ENDPOINTS.AUTH.CURRENT_USER}`, { headers: this.getHeaders() });
  }

  createAppointment(appointment: any): Observable<any> {
    return this.http.post(`${this.baseUrl}${API_ENDPOINTS.APPOINTMENTS.CREATE}`, appointment, { headers: this.getHeaders() });
  }

  addToWaitlist(waitlistEntry: any): Observable<any> {
    return this.http.post(`${this.baseUrl}${API_ENDPOINTS.WAITLIST.CREATE}`, waitlistEntry, { headers: this.getHeaders() });
  }

  joinWaitlist(waitlistEntry: any): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}${API_ENDPOINTS.WAITLIST.JOIN}`, waitlistEntry, { headers: this.getHeaders() });
  }

  getHealthPlans(): Observable<HealthPlan[]> {
    return this.http.get<HealthPlan[]>(`${this.baseUrl}${API_ENDPOINTS.HEALTH_PLANS.BASE}`, { headers: this.getHeaders() });
  }

  registerUser(userData: CreateUserRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}${API_ENDPOINTS.USERS.REGISTER}`, userData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  createDoctor(doctorData: CreateDoctorRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}${API_ENDPOINTS.DOCTORS.CREATE}`, doctorData, { headers: this.getHeaders() });
  }

  getDoctorByUserId(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}${API_ENDPOINTS.DOCTORS.GET_BY_USER_ID(userId)}`, { headers: this.getHeaders() });
  }

  getClinics(): Observable<Clinic[]> {
    return this.http.get<Clinic[]>(`${this.baseUrl}${API_ENDPOINTS.CLINICS.BASE}`, { headers: this.getHeaders() });
  }

  getClinicUsersByUserId(userId: number): Observable<ClinicUsers[]> {
    return this.http.get<ClinicUsers[]>(`${this.baseUrl}${API_ENDPOINTS.CLINIC_USERS.GET_BY_USER_ID(userId)}`, { headers: this.getHeaders() });
  }

  createClinicUser(data: CreateClinicUserRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}${API_ENDPOINTS.CLINIC_USERS.CREATE}`, data, { headers: this.getHeaders() });
  }

  createDoctorHealthPlan(data: CreateDoctorHealthPlanRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}${API_ENDPOINTS.DOCTOR_HEALTH_PLANS.CREATE}`, data, { headers: this.getHeaders() });
  }

  createSchedule(scheduleData: CreateScheduleRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}${API_ENDPOINTS.SCHEDULES.CREATE}`, scheduleData, { headers: this.getHeaders() });
  }
}
