import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { passwordMatchValidator } from '../../validators/password-match.validator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  signupForm: FormGroup;
  isFormSubmitted: boolean = false;

  successResponse: boolean = false;
  successMessage: string = '';
  // errorResponse: boolean = false;
  errorMessage: string | null = null;
  emptyFormDetect: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    this.signupForm = new FormGroup(
      {
        email: new FormControl("", [Validators.required, Validators.email]),
        password: new FormControl("", [
          Validators.required, 
          Validators.minLength(6),
        ]),
        username: new FormControl("", [Validators.required]),
        rePassword: new FormControl("", [Validators.required])
      },
      { validators: passwordMatchValidator() }
    );
  }

  onSubmit(): void {
    if(this.signupForm.valid) {
      const rawSignupForm = this.signupForm.getRawValue();
      this.authService.register(
        rawSignupForm.email, 
        rawSignupForm.username, 
        rawSignupForm.password
      ).subscribe({
        next: () => {
          this.router.navigateByUrl('/');
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

  goToLogInNoVal() {
    this.router.navigate(['/']);
  }


}
