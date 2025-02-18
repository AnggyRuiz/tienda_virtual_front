import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/auth/login`;

  constructor(private http: HttpClient) { }
  login(email: string, password: string): Observable<any> {
    console.log('Enviando solicitud a:', this.apiUrl);  // Verifica la URL
    return this.http.post<any>(this.apiUrl, { email, password });
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
}
