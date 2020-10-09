import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
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

@Injectable({
  providedIn: SharedModule,
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
  ) { }

  register(registrationDetails: RegistrationDetails): Observable<any> {
    return this.http.post(environment.API_URL + "register", registrationDetails);
  }

  login(loginDetails: LoginDetails): Observable<any> {
    return this.http.post(environment.API_URL + "login", loginDetails, {responseType: 'text'}).pipe(retry(1));
  }

  logout(): boolean {
    if(this.isAuthenticated()) {
      localStorage.removeItem("auth");
      return true;
    }
    return false;
  }

  isAuthenticated(): boolean {
    return localStorage.getItem("auth") !== null;
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders().append("Authorization", localStorage.getItem("auth"));
  }
}
