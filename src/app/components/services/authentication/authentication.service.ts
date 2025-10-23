import { Users } from '../../models/user.model';
import { environment } from '../../../../environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError, BehaviorSubject } from 'rxjs';
import { AuthTokenModel } from '../../models/authentication.model';
import { Injectable } from '@angular/core';
import { LoginUser } from '../../models/api-models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private apiUrl = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<AuthTokenModel | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    // Verificar se há token salvo no localStorage
    const savedToken = localStorage.getItem('authToken');
    const savedEmail = localStorage.getItem('userEmail');
    if (savedToken && savedEmail) {
      this.currentUserSubject.next({ email: savedEmail, token: savedToken });
    }
  }

  signin(loginUser: LoginUser): Observable<AuthTokenModel> {
    return this.http.post<AuthTokenModel>(`${this.apiUrl}/Auth/DirectLogin`, loginUser)
      .pipe(
        catchError((err: HttpErrorResponse) => throwError(() => err))
      );
  }

  signup(user: Users): Observable<any> {
    return this.http.post(`${this.apiUrl}/Users/Register`, user)
      .pipe(
        catchError((err: HttpErrorResponse) => throwError(() => err))
      );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    this.currentUserSubject.next(null);
  }

  setCurrentUser(tokenData: AuthTokenModel): void {
    localStorage.setItem('authToken', tokenData.token);
    localStorage.setItem('userEmail', tokenData.email);
    this.currentUserSubject.next(tokenData);
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
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
}
