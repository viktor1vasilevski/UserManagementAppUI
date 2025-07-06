import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authUserRaw = localStorage.getItem('auth_user');
    let token: string | null = null;
    if (authUserRaw) {
      try {
        const authUser = JSON.parse(authUserRaw);
        token = authUser?.token || null;
      } catch (e) {
        console.error('Invalid auth_user format in localStorage', e);
      }
    }

    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next.handle(cloned);
    }

    return next.handle(req);
  }
}
