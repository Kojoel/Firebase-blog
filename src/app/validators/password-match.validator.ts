import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const password = control.get('password');
    const rePassword = control.get('rePassword');

    // Return an error if passwords do not match
    return password && rePassword && password.value !== rePassword.value
      ? { passwordMismatch: true }
      : null;
  };
}
