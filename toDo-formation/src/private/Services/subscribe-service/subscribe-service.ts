import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class SubscribeService {
  private apiUrl = 'https://todof.woopear.fr/api/v1/user/register'

  private http = inject(HttpClient)

  register(userData: User) {
    const payload = { ...userData, role: userData.role || 'user' }
    return this.http.post(this.apiUrl, payload)
  }
}
