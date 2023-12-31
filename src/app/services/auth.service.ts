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
  #currentUserSubject: BehaviorSubject<User | null>;
  #currentUser: Observable<User | null>;
  #backendService: BackendService;

  constructor(backendService: BackendService) {
    this.#currentUserSubject = new BehaviorSubject<User | null>(null);
    this.#currentUser = this.#currentUserSubject.asObservable();
    this.#backendService = backendService;
    this.isLoggedIn().subscribe();
  }

  /**
   * Check if there is a user logged in.
   *
   * @returns A user is logged in
   */
  public isLoggedIn(): Observable<boolean> {
    return this.#backendService.isLoggedIn().pipe(
      map((response: HttpResponse<Object>) => {
        const user = response.body as User;
        if (user && user._id) {
          this.#currentUserSubject.next(user);
          return true;
        } else {
          this.logout();
          return false;
        }
      })
    );
  }

  /**
   * Logs in, and sets the value of the current user subject to be the
   * logged in user.
   *
   * @returns The logged in user
   */
  public login(username: string, password: string): Observable<User> {
    return this.#backendService.signIn(username, password).pipe(
      map((user: User) => {
        if (user && user._id) {
          this.#currentUserSubject.next(user);
        }
        return user;
      })
    );
  }

  /**
   * Logs out, and sets the current user subject to be null.
   */
  public logout() {
    this.#backendService.signOut().subscribe();
    this.#currentUserSubject.next(null);
  }

  public get currentUserValue(): Observable<User | null> {
    return this.#currentUser;
  }
}
