import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthManagerService {
  private readonly AUTH_KEY = 'auth_user';

  private authSubject = new BehaviorSubject<{
    username: string;
    role: string;
    token: string;
    isActive: boolean;
  } | null>(this.getAuth());

  authChanges$ = this.authSubject.asObservable();

  constructor() {}

  setAuth(authData: {
    username: string;
    role: string;
    token: string;
    isActive: boolean;
  }): void {
    localStorage.setItem(this.AUTH_KEY, JSON.stringify(authData));
    this.authSubject.next(authData);
  }

  getAuth(): {
    username: string;
    role: string;
    token: string;
    isActive: boolean;
  } | null {
    const data = localStorage.getItem(this.AUTH_KEY);
    return data ? JSON.parse(data) : null;
  }

  clearAuth(): void {
    localStorage.removeItem(this.AUTH_KEY);
    this.authSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.AUTH_KEY);
  }

  getToken(): string | null {
    const auth = this.getAuth();
    return auth ? auth.token : null;
  }

  getRole(): string | null {
    const auth = this.getAuth();
    return auth ? auth.role : null;
  }

  getIsActive(): boolean | null {
    const auth = this.getAuth();
    return auth ? auth.isActive : null;
  }

  getUsername(): string | null {
    const auth = this.getAuth();
    return auth ? auth.username : null;
  }
}
