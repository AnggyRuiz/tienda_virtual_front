import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/auth`;
  private roleSubject = new BehaviorSubject<string | null>(null);
  public role$ = this.roleSubject.asObservable();

  constructor(private http: HttpClient) {  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        if (response.access_token) {
          localStorage.setItem('token', response.access_token);
          
          // Aquí se actualiza el rol
          this.getUserRoleFromBackend().subscribe(role => {
            this.roleSubject.next(role.user);  // Actualiza el rol
          });
        } else {
          console.error("🚨 No se recibió `access_token` en la respuesta");
        }
      }),
      catchError((error) => {
        console.error("🚨 Error de login:", error);
        throw error;  // Lanza el error para que pueda ser manejado en el componente
      })
    );
  }

  getUserRoleFromBackend(): Observable<{ user: string }> {
    const token = this.getToken();
    return this.http.get<{ user: string }>(`${this.apiUrl}/role`, { // Definir el tipo de la respuesta como un objeto con `user` de tipo string
      headers: { Authorization: `Bearer ${token}` }
    }).pipe(
      tap(response => {
        console.log("🔍 Rol obtenido desde el backend:", response);
        const role = response.user; // Accede a la propiedad `user`
        this.roleSubject.next(role); // Actualiza el rol en el BehaviorSubject
      })
    );
  }
  

  logout() {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('token') !== null;
  }

  getAuthToken(): string | null {
    return localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private loadUserRole() {
    const token = this.getToken();
    console.log("🔍 Intentando cargar rol. Token obtenido:", token);
  
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        console.log("✅ Token decodificado:", decodedToken);
  
        if (decodedToken.role) {
          console.log("🟢 Rol encontrado:", decodedToken.role);
          this.roleSubject.next(decodedToken.role); // 🔥 Asigna el rol al BehaviorSubject
        } else {
          console.warn("⚠️ El token no contiene `role`.");
          this.roleSubject.next(null);
        }
      } catch (error) {
        console.error("🚨 Error al decodificar el token:", error);
        this.roleSubject.next(null);
      }
    } else {
      console.warn("⚠️ No hay token almacenado.");
      this.roleSubject.next(null);
    }
  }

  getUserRole(): string | null {
    return this.roleSubject.value;
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'admin';
  }
}
