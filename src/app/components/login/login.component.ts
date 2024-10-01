import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  isFormSubmitted: boolean = false;

  constructor(
    private router: Router,
    // public api: ApiService,
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(6)])
    })
  }

  goToSignUp() {
    this.router.navigate(['/signup']);
  }

  goToHome() {
    if(this.isFormSubmitted) {
      this.router.navigate(['/home'])
    }
  }

  onSubmit() {
  //   if(this.loginForm.value.email !== '' || this.loginForm.value.password !== '') {
  //     this.api.onLogin(this.loginForm.value);
  //   }

  //   const isFormValid = this.api.checkFormSubmitted;

  //   this.isFormSubmitted = isFormValid;
  //   this.loginForm.markAllAsTouched();
  //   this.goToHome()
  }

}
