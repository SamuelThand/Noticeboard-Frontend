import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { BackendService } from './services/backend.service';
import { BehaviorSubject } from 'rxjs';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// export class AppComponent implements OnInit {
export class AppComponent {
  title = 'dt167g-project-group6-frontend';
  currentUser: User | null;

  constructor(
    private authService: AuthService,
    private backendService: BackendService,
    private router: Router
  ) {
    this.currentUser = null;
    this.authService.currentUserValue.subscribe(
      (user) => (this.currentUser = user) //TODO hur vänta på response innan man laddar sidan
    );
  }

  onLogout() {
    this.authService.logout();
  }
}
