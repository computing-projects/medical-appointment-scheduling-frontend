import { AuthState, Clients, Users } from '../../models/user.model';
import { environment } from '../../../../environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError, BehaviorSubject } from 'rxjs';
import { AuthTokenModel } from '../../models/authentication.model';
import { Injectable } from '@angular/core';
import { LoginUser, TokenDto } from '../../models/api-models';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { UserProfile } from '../../standalone/perfil/perfil.component';
import { MedicalHistory } from '../../standalone/perfil-anamnese/perfil-anamnese.component';
import { Consultation } from '../../standalone/perfil-appointment/perfil-appointment.component';
import { DoctorProfile } from '../../standalone/perfil-doctor/perfil-doctor.component';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private apiUrl = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<AuthTokenModel | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private authStateSubject = new BehaviorSubject<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
  });
  public authState$ = this.authStateSubject.asObservable();
  private roleUser = '';

  constructor(private http: HttpClient, private apiService: ApiService, private router: Router) {
    // Verificar se há token salvo no localStorage
    const savedToken = localStorage.getItem('token');
    const savedEmail = localStorage.getItem('userEmail');
    const savedRole = localStorage.getItem('role');
    if (savedToken && savedEmail && savedRole) {
      this.currentUserSubject.next({ email: savedEmail, token: savedToken, role: savedRole });
    }
    this.initializeAuth();
  }

  private initializeAuth(): void {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        this.authStateSubject.next({
          user,
          token,
          isAuthenticated: true,
        });
      } catch (error) {
        this.logout();
      }
    }
  }

  signin(loginUser: LoginUser): Observable<AuthTokenModel> {
    return new Observable(observer => {
      this.apiService.login(loginUser).subscribe({
        next: (response: AuthTokenModel) => {
          localStorage.setItem('token', response.token);
          this.apiService.getCurrentUser().subscribe({
            next: (user: Users) => {
              localStorage.setItem('user', JSON.stringify(user));
              localStorage.setItem('role', user.role);
              this.roleUser = user.role;
              this.authStateSubject.next({
                user,
                token: response.token,
                isAuthenticated: true,
              });
              observer.next(response);

              observer.complete();
            },
            error: error => {
              observer.error(error);
            },
          });
        },
        error: error => {
          observer.error(error);
        },
      });
    });
  }

  signup(user: Users): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/Users/Register`, user)
      .pipe(catchError((err: HttpErrorResponse) => throwError(() => err)));
  }

  clientRegister(client: Clients): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/Clients/Create`, client)
      .pipe(catchError((err: HttpErrorResponse) => throwError(() => err)));
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }

  setCurrentUser(tokenData: AuthTokenModel): void {
    localStorage.setItem('authToken', tokenData.token);
    localStorage.setItem('userEmail', tokenData.email);
    localStorage.setItem('userRole', tokenData.role);
    this.currentUserSubject.next(tokenData);
  }

  getUser(): Users | null {
    return this.authStateSubject.value.user;
  }

  getUserRole(): string {
    let role: any;
    this.roleUser ? (role = this.roleUser) : (role = localStorage.getItem('role'));
    return role;
  }

  getCurrentUser(): AuthTokenModel | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getCurrentUser()?.token;
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  //TODO: precisa tirar daqui pra baixo e criar as paradas certinho
  
  getUserById(id: number): Observable<UserProfile> {
    const headers = this.getAuthHeaders();
    return this.http
      .get<UserProfile>(`${this.apiUrl}/Clients/GetById/${id}`, { headers })
      .pipe(
        catchError((err: HttpErrorResponse) => throwError(() => err))
      );
  }
    
  getDoctorById(id: number): Observable<DoctorProfile> {
    const headers = this.getAuthHeaders();
    return this.http
      .get<DoctorProfile>(`${this.apiUrl}/Doctors/GetById/${id}`, { headers })
      .pipe(
        catchError((err: HttpErrorResponse) => throwError(() => err))
      );
  }

  getDoctorCalendarById(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http
      .get<any>(`${this.apiUrl}/Doctors/GetCalendarById/${id}`, { headers })
      .pipe(
        catchError((err: HttpErrorResponse) => throwError(() => err))
      );
  }

  getAnamneseById(id: number): Observable<MedicalHistory> {
    const headers = this.getAuthHeaders();
    return this.http
      .get<MedicalHistory>(`${this.apiUrl}/Anamnese/client/${id}`, { headers })
      .pipe(
        catchError((err: HttpErrorResponse) => throwError(() => err))
      );
  }

  getConsultasByUserId(id: number): Observable<Consultation[]> {
    const headers = this.getAuthHeaders();
    return this.http
      .get<Consultation[]>(`${this.apiUrl}/Appointments/GetById/${id}`, { headers })
      .pipe(
        catchError((err: HttpErrorResponse) => throwError(() => err))
      );
  }

  getClient(): Observable<Clients> {
    const user = this.getUser();
    const role = this.getUserRole();

    if (!user) {
      return throwError(() => new Error('User not authenticated'));
    }

    // Get userId - check both id and userId (in case API returned userId directly)
    const userId = user.id || (user as any).userId;
    if (!userId) {
      return throwError(() => new Error('User ID not found'));
    }

    if (role !== 'client') {
      return throwError(() => new Error('User is not a client'));
    }

    return this.http
      .get<Clients>(`${this.apiUrl}/Clients/GetByUserId/${userId}`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(catchError((err: HttpErrorResponse) => throwError(() => err)));
  }
}
