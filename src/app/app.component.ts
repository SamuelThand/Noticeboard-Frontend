import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { BackendService } from './services/backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'dt167g-project-group6-frontend';
  private authService: AuthService;
  private backendService: BackendService;
  private router: Router;
  protected isLoggedIn: boolean;

  constructor(
    authService: AuthService,
    backendService: BackendService,
    router: Router
  ) {
    this.authService = authService;
    this.backendService = backendService;
    this.router = router;
    this.isLoggedIn = false;
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loginStatus();
      }
    });
  }

  loginStatus() {
    this.authService.authCheck(
      () => {
        // TODO: Get stored user data like this
        this.authService.user$?.subscribe((user) => {
          console.log('Passed from authservice: ' + JSON.stringify(user));
        });
        this.isLoggedIn = true;
      },
      () => {
        this.isLoggedIn = false;
      }
    );
  }

  onLogout() {
    this.backendService.signOut().subscribe(() => {
      this.loginStatus();
    });
  }
}
