import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: string;

  loginForm = this.fb.group({
    username: [''],
    password: [''],
  });

  constructor(
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()) {
      this.router.navigate(['games']);
    }
  }

  login() {
    if(this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(resp => {
        if(resp.success) {
          this.message = null;
          this.router.navigate(['games']);
        } else {
          this.message = resp.message;
        }
      });
    } else {
      this.message = "Please fill in all required fields";
    }
  }

}
