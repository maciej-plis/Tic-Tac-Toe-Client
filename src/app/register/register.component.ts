import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild("registrationForm") formElement: ElementRef;

  registerForm = this.fb.group({
    email: [''],
    username: [''],
    password: [''],
    verifyPassword: [''],
  }, {updateOn: 'submit'});

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
    this.formElement.nativeElement.classList.add("submitted");
    this.registerForm.enable();
    if(this.registerForm.valid) {
      this.tryToRegister();
    }
  }

  private tryToRegister() {
    this.authService.register(this.registerForm.value).subscribe(resp => {
      if(resp.success) {
        this.router.navigate(['login']);
      } else {
        this.setFieldErrors(resp.fieldErrors);
      }
    });
  }

  private setFieldErrors(fieldErrors: any) {
    for(let field in fieldErrors) {
      this.registerForm.controls[field].setErrors({"serverError": fieldErrors[field]});
    }
  }
}
