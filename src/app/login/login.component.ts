import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formSubmitted = false;
  loginFailed = false; // TODO lägg till popup för failad login
  //TODO blå outline när form blir targeted

  form: FormGroup = new FormGroup({
    userName: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });

  onSubmit() {
    this.formSubmitted = true;
    if (this.form.valid) {
      this.login();
    }
  }

  login() {
    // const username = this.form.username;
    // const password = this.form.password;
    // if (username && password) {
    //   this.backendService.signIn(username, password).subscribe({
    //     next: () => this.router.navigateByUrl('/admin-home'),
    //     error: () => {
    //       this.isPostFailed = true;
    //     }
    //   });
    // }
  }

  showErrorBorder(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && control?.errors && this.formSubmitted;
  }
}
