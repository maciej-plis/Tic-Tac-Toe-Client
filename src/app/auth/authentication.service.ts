import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SharedModule } from '../shared/shared.module';

interface LoginDetails {
  username: string,
  password: string
}

interface RegistrationDetails {
  email: string,
  username: string,
  password: string,
  verifyPassword: string
}

interface User {
  name: string,
  token: string,
  expire: number
}

@Injectable({
  providedIn: SharedModule,
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
  ) { }

  register(registrationDetails: RegistrationDetails): Observable<boolean> {
    return this.http.post(environment.API_URL + "register", registrationDetails).pipe(
      catchError(errorResp => this.mapResponseError(errorResp)), 
      map(() => true));
  }

  login(loginDetails: LoginDetails): Observable<boolean> {
    return this.http.post(environment.API_URL + "login", loginDetails).pipe(
      catchError(errorResp => this.mapResponseError(errorResp)),
      tap((resp: User) => this.setAuthenticatedUser(resp)),
      map(() => true));
  }

  loginAsGuest():Observable<boolean> {
    return this.http.get(environment.API_URL + "login-guest").pipe(
      catchError(errorResp => this.mapResponseError(errorResp)),
      tap((resp: User) => this.setAuthenticatedUser(resp)),
      map(() => true));
  }

  logout(): boolean {
    if(this.isAuthenticated()) {
      localStorage.removeItem("user");
      return true;
    }
    return false;
  }

  isAuthenticated(): boolean {
    const user: User = JSON.parse(localStorage.getItem("user"));
    
    if(user != null) {
        const now: number = new Date().getTime();  
        return user.expire > now;
    }

    return false;
  }

  isServerOnline(): Observable<boolean> {
    return this.http.get<boolean>(environment.API_URL).pipe(
      catchError(() => of(false))
    );
  }

  getAuthenticatedUser(): User {
    return JSON.parse(localStorage.getItem("user"));
  }

  getAuthHeaders(): HttpHeaders {
    const user = this.getAuthenticatedUser();

    if(user == null) {
      throw new Error('User is not authenticated');
    }

    return new HttpHeaders().append("Authorization", user.token);
  }

  private mapResponseError(errorResp: HttpErrorResponse) {

    let error = errorResp.error;

    if(errorResp.status == 0) {
      error = {message: "Unknown error occured"};
    }

    return throwError(error);
  }

  private setAuthenticatedUser(user: User) {
    localStorage.setItem("user", JSON.stringify(user));
  }
}
