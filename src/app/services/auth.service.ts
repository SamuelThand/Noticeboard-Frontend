import { BehaviorSubject, Observable } from 'rxjs';
import { BackendService } from './backend.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router: Router;
  private backendService: BackendService;
  private userSubject: BehaviorSubject<User> | null = null;
  user$: Observable<User> | null = null;

  constructor(router: Router, backendService: BackendService) {
    this.router = router;
    this.backendService = backendService;
  }

  authCheck(successCallback: Function, errorCallback: Function) {
    this.backendService.isLoggedIn().subscribe({
      next: (result) => {
        if (this.userSubject === null) {
          this.setUserSubject(result.body as User);
        }
        successCallback(result);
      },
      error: () => {
        if (this.userSubject !== null) {
          this.removeUserSubject();
        }
        errorCallback();
      }
    });
  }

  setUserSubject(user: User) {
    this.userSubject = new BehaviorSubject<User>(user);
    this.user$ = this.userSubject.asObservable();
    this.userSubject.next(user);
  }

  removeUserSubject() {
    this.userSubject = null;
    this.user$ = null;
  }
}
