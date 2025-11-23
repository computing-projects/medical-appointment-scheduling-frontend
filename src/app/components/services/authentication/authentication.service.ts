import { AuthState, Clients, Users, ClinicUsers } from '../../models/user.model';
import { environment } from '../../../../environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError, BehaviorSubject } from 'rxjs';
import { AuthTokenModel } from '../../models/authentication.model';
import { Injectable } from '@angular/core';
import { LoginUser, TokenDto } from '../../models/api-models';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

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
            next: (user: any) => {
              localStorage.setItem('user', JSON.stringify(user));
              localStorage.setItem('role', user.role);
              this.roleUser = user.role;
              
              // Fetch clinicId for doctors and admins
              if ((user.role === 'doctor' || user.role === 'admin')) {
                // Try to get userId from the user object (it might be in different formats)
                // The API might return id directly or nested in a user property
                const userId = user.id || user.userId || (user.user && user.user.id) || (user.user && user.user.userId);
                
                if (userId) {
                  this.apiService.getClinicUsersByUserId(userId).subscribe({
                    next: (clinicUsers: ClinicUsers[]) => {
                      if (clinicUsers && Array.isArray(clinicUsers) && clinicUsers.length > 0) {
                        const clinicId = clinicUsers[0].clinicId;
                        localStorage.setItem('clinicId', clinicId.toString());
                      } else {
                        localStorage.removeItem('clinicId');
                      }
                    },
                    error: () => {
                      localStorage.removeItem('clinicId');
                    }
                  });
                } else {
                  localStorage.removeItem('clinicId');
                }
              } else {
                localStorage.removeItem('clinicId');
              }

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
    localStorage.removeItem('clinicId');
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
