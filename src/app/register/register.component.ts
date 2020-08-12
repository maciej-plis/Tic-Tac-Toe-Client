import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = this.fb.group({
    email: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required],
    verifyPassword: ['', Validators.required],
  });

  constructor(
    private authService: AuthenticationService,
    private fb: FormBuilder,  
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  register() {
    if(this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(resp => {
        this.router.navigate(['login']);
      });
    }
  }

}
