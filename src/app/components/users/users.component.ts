import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  isAdmin: boolean = false;

  constructor(private usersService: UsersService, private authService: AuthService) {}

  ngOnInit(): void {
    // Suscripción para verificar el rol, pero no repetir las acciones innecesarias
    this.authService.role$.pipe(take(1)).subscribe(role => {
      this.isAdmin = role === 'admin';
      console.log("admin status:", this.isAdmin);
      if (this.isAdmin) {
        this.loadUsers();
      }
    });
  }
  
  loadUsers(): void {
    this.usersService.getUsers().subscribe(
      (data) => { this.users = data; },
      (error) => { console.error('Error loading users', error); }
    );
  }

  deleteUser(id: number): void {
    if (this.isAdmin) {
      this.usersService.deleteUser(id).subscribe(() => {
        this.users = this.users.filter(user => user.id !== id);
      });
    }
  }
}
