import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SharedModule } from '../shared.module';

interface User {
  username: string,
  token: string,
}

interface LoginDetails {
  username: string,
  password, string,
  rememberMe: boolean
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

  private url: string = "http://localhost:8080";

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) { }

  register(registrationDetails: RegistrationDetails) {
    return this.http.post<{success: boolean, message: string}>(this.url + "/register", registrationDetails);
  }

  login(loginDetails: LoginDetails) {
    return this.http.post<{success: boolean, message: string, user: User}>(this.url + "/authenticate", loginDetails).pipe(
      map(resp => {
        if(resp.success) {
          this.cookieService.set("Authorization", resp.user.token, 1);
          delete resp.user;
        }
        return resp;
      })
    );
  }

  logout() {
    this.cookieService.delete("Authorization");
  }

  public isAuthenticated(): boolean {
    return this.cookieService.check("Authorization");
  }
}
