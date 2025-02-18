import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = `${environment.apiUrl}/users`; // Ajusta la URL según tu backend

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Método para obtener los usuarios
  getUsers(): Observable<any[]> {
    const token = this.authService.getToken(); // Obtener el token desde el AuthService
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Agregar el token a los encabezados

    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  // Método para obtener un usuario por su ID
  getUserById(id: number): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers });
  }

  // Método para agregar un usuario
  addUser(user: any): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(this.apiUrl, user, { headers });
  }

  // Método para actualizar un usuario
  updateUser(id: number, user: any): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put(`${this.apiUrl}/${id}`, user, { headers });
  }

  // Método para eliminar un usuario
  deleteUser(id: number): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
}