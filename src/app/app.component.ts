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
// export class AppComponent implements OnInit {
export class AppComponent implements OnInit {
  title = 'dt167g-project-group6-frontend';
  currentUser: User | null;

  constructor(
    private authService: AuthService,
    private backendService: BackendService,
    private router: Router
  ) {
    this.currentUser = null;
  }

  ngOnInit() {
    this.authService.currentUserValue.subscribe(
      (user) => (this.currentUser = user)
    );
  }

  onLogout() {
    this.authService.logout();
  }
}
