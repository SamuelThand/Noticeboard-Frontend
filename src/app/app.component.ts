import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { BackendService } from './services/backend.service';
import { Router } from '@angular/router';
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
  #backendService: BackendService;
  #router: Router;

  constructor(
    authService: AuthService,
    backendService: BackendService,
    router: Router
  ) {
    this.#authService = authService;
    this.#backendService = backendService;
    this.#router = router;
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
