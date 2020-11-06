import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../shared-style.css', './register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = this.fb.group({
    email: [''],
    username: [''],
    password: [''],
    verifyPassword: [''],
  });

  submitted: boolean = false;
  message: string;

  constructor(
    private authService: AuthenticationService,
    private fb: FormBuilder,  
    private router: Router
  ) { }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()) {
      this.router.navigate(['games']);
    }
  }

  register() {
    this.submitted = true;
    this.message = null;

    this.registerForm.enable();
    if(this.registerForm.valid) {
      this.tryToRegister();
    }
  }

  getErrorsFor(fieldName: string): {} {
    const fieldControl: AbstractControl = this.registerForm.controls[fieldName];

    if(!fieldControl || !fieldControl.errors || !this.submitted) {
      return {};
    }

    if(fieldControl.errors.required) {
      fieldControl.errors.required = "Please fill in this field";
    }

    if(fieldControl.errors.email) {
      fieldControl.errors.email = "Please provide a valid email";
    }

    return fieldControl.errors;
  }

  private tryToRegister() {
    this.authService.register(this.registerForm.value).subscribe(this.registrationSuccess, this.registartionFailure);
  }

  private registrationSuccess = () => {
    this.router.navigate(["login"]);
  }

  private registartionFailure = (error) => {
    this.message = error.message;
    this.setFieldErrors(error.fieldErrors);
  }

  private setFieldErrors(fieldErrors: {}) {
    for(let field in fieldErrors) {
      this.registerForm.controls[field].setErrors({"serverError": fieldErrors[field]});
    }
  }
}
