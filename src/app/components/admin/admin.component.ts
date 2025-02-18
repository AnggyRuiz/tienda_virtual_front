// src/app/components/admin/admin.component.ts
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ProductsService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Importa Router para la redirección

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  imports: [CommonModule,
    FormsModule,],
  providers: [UsersService, ProductsService],  // Proveer los servicios aquí

})
export class AdminComponent implements OnInit {
  users: any[] = [];
  products: any[] = [];
  isAdmin: boolean = false;
  newUser = { email: '', role: '', password: '', name: '' };
  newProduct = { name: '', price: 0, description: '', quantity: 0, stock: 0};
  constructor(
    private userService: UsersService,
    private productService: ProductsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.checkAdmin(); // Verifica si el usuario es admin
    if (this.isAdmin) { // Solo obtén los datos si es admin
      this.getUsers();
      this.getProducts();
    }
  }


  checkAdmin() {
    // Obtiene el rol desde localStorage
    const role = localStorage.getItem('role');
    console.log("Rol desde localStorage:", role);

    // Verifica si el rol es 'admin'
    this.isAdmin = role === 'admin';
  }
  getUsers() {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error obteniendo usuarios', error);
      }
    );
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Error obteniendo productos', error);
      }
    );
  }
  addUser() {
    if (this.newUser.email && this.newUser.role && this.newUser.password && this.newUser.name) {
      this.userService.addUser(this.newUser).subscribe(
        (data) => {
          this.users.push(data);
          this.newUser = { email: '', role: '', password: '', name: '' };  // Limpiar formulario
        },
        (error) => { console.error('Error al agregar usuario', error); }
      );
    }
  }

  addProduct() {
    if (this.newProduct.name && this.newProduct.price) {
      this.productService.addProduct(this.newProduct).subscribe(
        (data) => {
          this.products.push(data);
          this.newProduct = {
            name: '', price: 0, description: '', quantity: 0, stock: 0
          };
        },
        (error) => { console.error('Error al agregar usuario', error); }
      );
    }
  }
  deleteUser(userId: number) {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.userService.deleteUser(userId).subscribe(() => {
        this.users = this.users.filter(user => user.id !== userId);
      });
    }
  }

  deleteProduct(productId: number) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productService.deleteProduct(productId).subscribe(() => {
        this.products = this.products.filter(product => product.id !== productId);
      });
    }
  }
  logout() {
    // Elimina el token de localStorage (o sessionStorage si lo usas)
    localStorage.removeItem('role');
    localStorage.removeItem('token'); // Asumiendo que el token de JWT está almacenado aquí

    // Redirige al usuario a la página de inicio de sesión o página principal
    this.router.navigate(['/login']); // Asegúrate de que la ruta de login esté configurada
  }

}