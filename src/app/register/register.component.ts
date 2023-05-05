import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formSubmitted = false;
  registerFailed = false; // TODO lägg till popup för failad register
  //TODO blå outline när form blir targeted

  form: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  onSubmit() {
    this.formSubmitted = true;
    if (this.form.valid) {
      this.submit();
    }
  }

  private submit() {
    // Perform your submit logic here.
  }

  showErrorBorder(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && control?.errors && this.formSubmitted;
  }
}
