import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.getUserRoleFromBackend().pipe(
      take(1),
      map(response => {
        const role = response.user;  // Aquí accedes a 'admin' que está dentro de 'user'

        console.log("🔍 Role detectado en AuthGuard:", role);
        localStorage.setItem("role", role)

        // Evitar redirección infinita
        if (state.url === '/admin' && role === 'admin') {
          console.log("✅ Ya en la ruta /admin, no redirigiendo.");
          return true;
        }

        if (state.url === '/products' && role !== 'admin') {
          console.log("✅ Ya en la ruta /products, no redirigiendo.");
          return true; // Usuario no es admin, ya está en la ruta correcta
        }
        if (role === 'admin') {
          console.log("✅ Redirigiendo a /admin");
          this.router.navigate(['/admin']);
          return false; // No se permite acceso a la página actual
        } else {
          console.warn("🚫 Redirigiendo a /products");
          this.router.navigate(['/products']);
          return false; // No se permite acceso a la página actual
        }
      })
    );
  }
}