import { BackendService } from './services/backend.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dt167g-project-group6-frontend';
  private backendService: BackendService;
  private router: Router;

  constructor(backendService: BackendService, router: Router) {
    this.backendService = backendService;
    this.router = router;
  }
}
