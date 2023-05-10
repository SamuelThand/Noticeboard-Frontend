import { BehaviorSubject, Observable } from 'rxjs';
import { BackendService } from './backend.service';
import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  private currentUser: Observable<User | null>;

  constructor(private backendService: BackendService) {
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
    this.currentUser = this.currentUserSubject.asObservable();
    this.isLoggedIn().subscribe();
  }

  isLoggedIn(): Observable<boolean> {
    return this.backendService.isLoggedIn().pipe(
      map((response: HttpResponse<Object>) => {
        const user = response.body as User;
        if (user && user._id) {
          this.currentUserSubject.next(user);
          return true;
        } else {
          this.logout();
          return false;
        }
      })
    );
  }

  login(username: string, password: string) {
    return this.backendService.signIn(username, password).pipe(
      map((user: User) => {
        if (user && user._id) {
          this.currentUserSubject.next(user);
        }
        return user;
      })
    );
  }

  logout() {
    this.backendService.signOut().subscribe();
    this.currentUserSubject.next(null);
  }

  public get currentUserValue(): Observable<User | null> {
    return this.currentUser;
  }
}
