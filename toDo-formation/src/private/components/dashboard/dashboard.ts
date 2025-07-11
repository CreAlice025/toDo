import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { AuthService } from '../../../Services/auth-service/auth-service';
import { Header } from "../../../shared/header/header";

@Component({
  selector: 'app-dashboard',
  imports: [
    JsonPipe,
    Header
  ],
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  private authService = inject(AuthService);
  private http = inject(HttpClient);

  // variable disponible pour savoir si l'utilisateur est connecté
  isLoggedIn = this.authService.isLoggedIn;
  data: any = null;

  loadData() {
    // Le token sera automatiquement ajouté par l'intercepteur
    this.http.get('https://todof.woopear.fr/api/v1/user/profil').subscribe({
      next: (response) => this.data = response,
      error: (error) => console.error('Erreur:', error)
    });
  }

  //ajouter une tache

  // modifier une tache 

  //supprimé une tache

  // filtrer ?

  // kamban DRAG&Drop ?
}
