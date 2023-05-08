import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../services/backend.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private backendService: BackendService;
  private router: Router;
  formSubmitted = false;
  loginFailed = false; // TODO lägg till popup för failad login
  //TODO blå outline när form blir targeted

  form: FormGroup = new FormGroup({
    userName: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });

  constructor(backendService: BackendService, router: Router) {
    this.backendService = backendService;
    this.router = router;
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.form.valid) {
      this.login();
    }
  }

  login() {
    const username = this.form.value['userName'];
    const password = this.form.value['password'];
    if (username && password) {
      this.backendService.signIn(username, password).subscribe({
        next: () => {
          this.router.navigateByUrl('/');
        },
        error: () => {
          // TODO: Remove this and provide a proper response.
          console.log('Miss');
        }
      });
    }
  }

  showErrorBorder(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && control?.errors && this.formSubmitted;
  }
}
