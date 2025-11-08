import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    console.log('token', token);
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    });
  }

  // Auth endpoints
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/Auth/DirectLogin`, credentials);
  }

  // Doctor endpoints
  getDoctors(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Doctors`, { headers: this.getHeaders() });
  }

  getDoctorById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/Doctors/GetById/${id}`, { headers: this.getHeaders() });
  }

  getDoctorsByFilter(filter: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Doctors/GetDoctorsByFilter`, filter, { headers: this.getHeaders() });
  }

  // User endpoints
  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Auth/CurrentUser`, { headers: this.getHeaders() });
  }

  // Appointment endpoints
  createAppointment(appointment: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Appointments/Create`, appointment, { headers: this.getHeaders() });
  }

  // Waitlist endpoints
  addToWaitlist(waitlistEntry: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Waitlist/Create`, waitlistEntry, { headers: this.getHeaders() });
  }
}
