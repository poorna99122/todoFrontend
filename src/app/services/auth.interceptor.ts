import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authHeader = 'Basic ' + btoa('admin:admin123');

    const authReq = request.clone({
      setHeaders: {
        Authorization: authHeader,
        'Content-Type': 'application/json',
      },
    });

    return next.handle(authReq);
  }
}
