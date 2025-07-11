import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../Services/auth-service/auth-service';
import { SubscribeService } from '../../../Services/subscribe-service/subscribe-service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);
  private subscribeService = inject(SubscribeService)

  email = '';
  password = '';

  usernameRegister = '';
  emailRegister = '';
  passwordRegister = '';

  loading = signal(false);
  errorMessage = signal('');

  login() {
    if (!this.email || !this.password) return;

    this.loading.set(true);
    this.errorMessage.set('');

    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.loading.set(false);
        this.errorMessage.set('Email ou mot de passe incorrect');
      }
    });


  }

  subscribe() {
    if (!this.emailRegister || !this.passwordRegister || !this.usernameRegister) return;

    this.loading.set(true);
    this.errorMessage.set('');

    this.subscribeService.register({
      username: this.usernameRegister,
      email: this.emailRegister,
      password: this.passwordRegister,
      role: 'user'
    }).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.loading.set(false);
        this.errorMessage.set('Impossible de créer le compte');
      }
    })
  }

}

