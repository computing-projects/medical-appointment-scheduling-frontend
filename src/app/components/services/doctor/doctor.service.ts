import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


interface FilterDoctor {
  specialty: String;
  InitialDate: Date;
  FinalDate: Date;
}

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private baseUrl = 'https://api.seuservidor.com/doctors'; // Substitua pela URL base da sua API

  constructor(private http: HttpClient) {}

  // GET: Get all doctors
  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  // GET: Get doctor by ID
  getById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetById/${id}`);
  }

  // POST: Create a new doctor
  create(doctor: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Create`, doctor);
  }

  // PUT: Update an existing doctor
  update(id: number, doctor: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/Update/${id}`, doctor);
  }

  // DELETE: Delete a doctor by ID
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/Delete/${id}`);
  }

  // POST: Get doctors by filter
  getDoctorsByFilter(filter: FilterDoctor): Observable<any> {
    return this.http.post(`${this.baseUrl}/GetDoctorsByFilter`, filter);
  }
}
