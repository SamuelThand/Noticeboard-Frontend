import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../services/backend.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private backendService: BackendService;
  private router: Router;
  formSubmitted = false;
  registerFailed = false; // TODO lägg till popup för failad register
  //TODO blå outline när form blir targeted

  form: FormGroup = new FormGroup({
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
      Validators.minLength(6)
    ])
  });

  constructor(backendService: BackendService, router: Router) {
    this.backendService = backendService;
    this.router = router;
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.form.valid) {
      this.submit();
    }
  }

  private submit() {
    this.backendService.signUp(this.form.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/');
      },
      error: () => {
        console.log('Miss');
      }
    });
  }

  showErrorBorder(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && control?.errors && this.formSubmitted;
  }
}
