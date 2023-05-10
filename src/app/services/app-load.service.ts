import { firstValueFrom, of } from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppLoadService {
  constructor(private authService: AuthService) {}

  initApp(): Promise<any> {
    return firstValueFrom(
      this.authService.isLoggedIn().pipe(
        catchError((error) => {
          if (error.status === 401) {
            // Not logged in, resolve the promise with false
            return of(false);
          } else {
            // Another error, rethrow it
            throw error;
          }
        })
      )
    );
  }
}
