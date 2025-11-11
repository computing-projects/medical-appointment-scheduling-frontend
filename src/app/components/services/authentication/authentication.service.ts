import { AuthState, Users } from '../../models/user.model';
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
}
