import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { API_URL } from '../../game-api.config';
import { SharedModule } from '../shared.module';

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
    private cookieService: CookieService,
  ) { }

  register(registrationDetails: RegistrationDetails): Observable<any> {
    return this.http.post(API_URL + "register", registrationDetails);
  }

  login(loginDetails: LoginDetails): Observable<any> {
    return this.http.post(API_URL + "login", loginDetails, {withCredentials: true}).pipe(retry(1));
  }

  logout(): boolean {
    if(this.isAuthenticated()) {
      this.cookieService.delete("Authorization");
      return true;
    }
    return false;
  }

  isAuthenticated(): boolean {
    return this.cookieService.check("Authorization");
  }
}
