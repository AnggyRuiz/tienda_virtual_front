import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Para ngModel
import { MatInputModule } from '@angular/material/input';  // Para matInput
import { MatFormFieldModule } from '@angular/material/form-field';  // Para mat-form-field
import { MatButtonModule } from '@angular/material/button';  // Para mat-raised-button
import { MatCardModule } from '@angular/material/card';  // Para mat-card
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,  // Esto indica que es un componente independiente
  imports: [  // Aquí importas los módulos que necesitas
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit() {
    console.log('LoginComponent cargado');
  }
  onLogin() {
    console.log("LLega aca");

    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        if (response.access_token) {

          console.log("✅ Login exitoso:", response);

          setTimeout(() => {
            console.log("🔄 Redirigiendo a /users...");
            this.router.navigate(['/admin']);
          }, 100);
        } else {
          // Si el login falla, mostramos el mensaje de error
          alert(response.message);
        }
      },
      (error) => {
        // Aquí manejamos el error y mostramos un mensaje adecuado
        this.errorMessage = "Credenciales inválidas. Intenta de nuevo.";
        console.error('Login failed', error);
      }
    );
  }
}
