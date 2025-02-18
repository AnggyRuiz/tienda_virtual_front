import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Para ngModel
import { MatInputModule } from '@angular/material/input';  // Para matInput
import { MatFormFieldModule } from '@angular/material/form-field';  // Para mat-form-field
import { MatButtonModule } from '@angular/material/button';  // Para mat-raised-button
import { MatCardModule } from '@angular/material/card';  // Para mat-card
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,  // Esto indica que es un componente independiente
  imports: [  // Aquí importas los módulos que necesitas
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    console.log("LLega aca");
    
   /* this.authService.login(this.email, this.password).subscribe(
       (response) => {
        // Si el login es exitoso, guardamos el token en el localStorage
        localStorage.setItem('token', response.token);

        // Redirigimos al usuario a la página de productos o donde sea necesario
        this.router.navigate(['/products']);
      },
      (error) => {
        console.error('Login failed', error);
      } 
    );*/
  }
}
