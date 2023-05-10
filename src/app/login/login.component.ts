import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  #formSubmitted = false;
  #authService: AuthService;
  #router: Router;
  protected form: FormGroup = new FormGroup({
    userName: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });
  //TODO blå outline när form blir targeted

  constructor(authService: AuthService, router: Router) {
    this.#authService = authService;
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
        error: () => {
          // TODO: Provide error message
        }
      });
    }
  }

  protected showErrorBorder(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && control?.errors && this.#formSubmitted;
  }
}
