import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GameService } from '../game/service/game.service';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()) {
      this.router.navigate(['join']);
    }
  }

  login() {
    if(this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(resp => {
        if(resp.success) {
          this.router.navigate(['join']);
        }
      })
    }
  }

}
