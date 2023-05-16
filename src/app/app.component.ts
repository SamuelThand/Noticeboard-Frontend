import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'dt167g-project-group6-frontend';
  protected currentUser: User | null;
  #authService: AuthService;

  constructor(authService: AuthService) {
    this.#authService = authService;
    this.currentUser = null;
  }

  ngOnInit() {
    this.#authService.currentUserValue.subscribe(
      (user) => (this.currentUser = user)
    );
  }

  protected onLogout() {
    this.#authService.logout();
  }
}
