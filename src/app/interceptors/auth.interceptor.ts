import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const token = this.authService.getToken();  // Obtiene el token desde el localStorage o servicio

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`  // Añade el token en el header Authorization
        }
      });
    }

    return next.handle(request);
  }
}
