import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

interface FilterDoctor {
  specialty: string;
  InitialDate: Date;
  FinalDate: Date;
}

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(private apiService: ApiService) {}

  // GET: Get all doctors
  getAll(): Observable<any> {
    return this.apiService.getDoctors();
  }

  // GET: Get doctor by ID
  getById(id: number): Observable<any> {
    return this.apiService.getDoctorById(id);
  }

  // POST: Create a new doctor
  create(doctor: any): Observable<any> {
    return this.apiService.createDoctor(doctor);
  }

  // PUT: Update an existing doctor
  update(id: number, doctor: any): Observable<any> {
    return this.apiService.updateDoctor(id, doctor);
  }

  // DELETE: Delete a doctor by ID
  delete(id: number): Observable<any> {
    return this.apiService.deleteDoctor(id);
  }

  // POST: Get doctors by filter
  getDoctorsByFilter(filter: FilterDoctor): Observable<any> {
    return this.apiService.getDoctorsByFilter(filter);
  }
}
