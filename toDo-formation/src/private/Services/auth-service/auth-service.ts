
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface LoginResponse {
    data: {
        token: string;
    }
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient);
    private router = inject(Router);

    // URL de votre API - à adapter
    private apiUrl = 'https://todof.woopear.fr/api/v1/user';

    // Signal pour savoir si l'utilisateur est connecté
    isLoggedIn = signal(this.hasValidToken());

    /**
     * Connexion utilisateur
     */
    login(email: string, password: string): Observable<LoginResponse> {
        const credentials: LoginCredentials = { email, password };
        return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials)
            .pipe(
                tap((response: LoginResponse) => {
                    console.log(response);
                    // Stocker le token
                    localStorage.setItem('token', response.data.token);
                    this.isLoggedIn.set(true);
                })
            );
    }

    /**
     * Déconnexion
     */
    logout(): void {
        localStorage.removeItem('token');
        this.isLoggedIn.set(false);
        this.router.navigate(['/login']);
    }

    /**
     * Récupérer le token
     */
    getToken(): string | null {
        return localStorage.getItem('token');
    }

    /**
     * Vérifier si on a un token valide
     */
    private hasValidToken(): boolean {
        const token = this.getToken();
        if (!token) return false;

        try {
            // Vérifier l'expiration du token
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp * 1000 > Date.now();
        } catch {
            return false;
        }
    }
}
