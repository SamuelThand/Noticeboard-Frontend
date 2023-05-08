import { BackendService } from './backend.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router: Router;
  private backendService: BackendService;

  constructor(router: Router, backendService: BackendService) {
    this.router = router;
    this.backendService = backendService;
  }

  authCheck(successCallback: Function, errorCallback: Function) {
    this.backendService.isLoggedIn().subscribe({
      next: () => successCallback(),
      error: () => errorCallback()
    });
  }
}
