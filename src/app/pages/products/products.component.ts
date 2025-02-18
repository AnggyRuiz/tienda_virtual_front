import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProductsService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatButtonModule,
    MatCardModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  isAdmin: boolean = false;
  newProduct = { name: '', price: 0, description: '', stock: 0 };

  constructor(private productsService: ProductsService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.loadProducts();
  }

  loadProducts(): void {
    this.productsService.getProducts().subscribe(
      (data) => { this.products = data; },
      (error) => { console.error('Error loading products', error); }
    );
  }
  addProduct(): void {
    this.productsService.addProduct(this.newProduct).subscribe(() => {
      this.loadProducts();  // Recargar los productos después de agregar uno nuevo
      this.newProduct = { name: '', price: 0, description: '', stock: 0 };  // Limpiar el formulario
    });
  }
  deleteProduct(id: number): void {
      this.productsService.deleteProduct(id).subscribe(() => {
        this.products = this.products.filter(p => p.id !== id);
      });
    
  }
  logout() {
    // Elimina el token de localStorage (o sessionStorage si lo usas)
    localStorage.removeItem('role');
    localStorage.removeItem('token'); // Asumiendo que el token de JWT está almacenado aquí

    // Redirige al usuario a la página de inicio de sesión o página principal
    this.router.navigate(['/login']); // Asegúrate de que la ruta de login esté configurada
  }
}
