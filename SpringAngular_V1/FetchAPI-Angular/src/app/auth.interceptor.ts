import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authHeader = 'Basic ' + btoa('admin:admin'); // Encode "admin:admin"

    const clonedReq = req.clone({
      setHeaders: {
        Authorization: authHeader
      }
    });

    return next.handle(clonedReq);
  }
}
