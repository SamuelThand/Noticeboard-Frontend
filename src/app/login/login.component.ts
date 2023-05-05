import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  protected isPostFailed = false;
  protected form: any = {
    username: null,
    password: null
  };

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
}
