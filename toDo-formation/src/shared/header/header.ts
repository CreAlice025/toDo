import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../Services/auth-service/auth-service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  private authService = inject(AuthService);
  private http = inject(HttpClient);

  isLoggedIn = this.authService.isLoggedIn;
  data: any = null;

  logout() {
    this.authService.logout();
  }
}
