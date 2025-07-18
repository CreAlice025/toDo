import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../private/Services/auth-service/auth-service';
import { HttpClient } from '@angular/common/http';
import { Button } from "../button/button";

@Component({
  selector: 'app-header',
  imports: [CommonModule, Button],
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
