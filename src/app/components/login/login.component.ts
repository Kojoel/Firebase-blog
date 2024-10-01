import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';

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

  errorMessage: string | null = null;
  emptyFormDetect: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(6)])
    })
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  onSubmit(): void {
    if(this.loginForm.valid) {
      const rawloginForm = this.loginForm.getRawValue();
      this.authService.login(
        rawloginForm.email, 
        rawloginForm.password
      ).subscribe({
        next: () => {
          this.router.navigateByUrl('/home');
        },
        error: (err) => {
          this.errorMessage = err.code;
          console.log(this.errorMessage);
        }
      });
    }
    else {
      this.emptyFormDetect = true;
    }
  }

  loginWithGoogle() {
    this.authService.googleSignIn().subscribe({
      next: (user) => {
        this.router.navigateByUrl('/home');
      },
      error: (err) => {
        this.errorMessage = err.code;
      }
    })
  }

}
