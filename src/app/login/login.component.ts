import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  #formSubmitted = false;
  #authService: AuthService;
  #snackBar: MatSnackBar;
  #router: Router;
  protected form: FormGroup = new FormGroup({
    userName: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });

  constructor(authService: AuthService, snackBar: MatSnackBar, router: Router) {
    this.#authService = authService;
    this.#snackBar = snackBar;
    this.#router = router;
  }

  protected onSubmit() {
    this.#formSubmitted = true;
    if (this.form.valid) {
      this.#login();
    }
  }

  #login() {
    const username = this.form.value['userName'];
    const password = this.form.value['password'];
    if (username && password) {
      this.#authService.login(username, password).subscribe({
        next: () => {
          this.#router.navigateByUrl('/');
        },
        error: (message) => {
          this.#snackBar.open(message.error.message, 'Close', {
            duration: 3000
          });
        }
      });
    }
  }

  protected showErrorBorder(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && control?.errors && this.#formSubmitted;
  }
}
