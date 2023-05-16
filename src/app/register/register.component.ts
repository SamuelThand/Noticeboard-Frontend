import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { BackendService } from '../services/backend.service';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

function checkPasswords(group: AbstractControl): ValidationErrors | null {
  const password = (group as FormGroup).get('password')?.value;
  const confirmPassword = (group as FormGroup).get('confirmPassword')?.value;

  return password === confirmPassword ? null : { notSame: true };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  #formSubmitted = false;
  #registerFailed = false; // TODO lägg till popup för failad register, blå outline när form blir targeted
  #backendService: BackendService;
  #snackBar: MatSnackBar;
  #router: Router;

  protected form: FormGroup = new FormGroup(
    {
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(60)
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(60)
      ]),
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(124),
        Validators.pattern(
          '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-+_!@#$%^&*.,?]).{10,124}$'
        )
      ]),
      confirmPassword: new FormControl('', [Validators.required])
    },
    { validators: [checkPasswords] }
  );

  constructor(
    backendService: BackendService,
    snackBar: MatSnackBar,
    router: Router
  ) {
    this.#backendService = backendService;
    this.#snackBar = snackBar;
    this.#router = router;
  }

  protected onSubmit() {
    this.#formSubmitted = true;
    if (this.form.valid) {
      this.#submit();
    }
  }

  #submit() {
    this.#backendService.signUp(this.form.value).subscribe({
      next: () => {
        this.#snackBar.open('User has been created', 'Close', {
          duration: 3000
        });
        this.#router.navigateByUrl('/login');
      },
      error: (message) => {
        this.#snackBar.open(message.error.message, 'Close', {
          duration: 3000
        });
      }
    });
  }

  protected showErrorBorder(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && control?.errors && this.#formSubmitted;
  }
}
