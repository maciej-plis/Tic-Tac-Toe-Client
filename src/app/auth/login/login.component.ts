import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../shared-style.css', './login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    username: [''],
    password: [''],
  });

  message: string;

  constructor(
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.authService.isServerOnline().subscribe((isOnline: boolean) => {
      if(!isOnline) {
        this.message = "Sorry, server is currently offline"
      }
      else if(this.authService.isAuthenticated()) {
        this.router.navigate(['games']);
      }
    }); 
  }

  login() {
    this.message = null;

    if(this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(this.loginSuccess, this.loginFailure);
    } else {
      this.message = "Please fill in all fields";
    }
  }

  loginAsGuest() {
    this.message = "Sorry this feature is unavaiable yet :(";
  }

  private loginSuccess = () => {
    this.router.navigate(['games']);
  }

  private loginFailure = (error) => {
    this.message = error.message;
  }
}
