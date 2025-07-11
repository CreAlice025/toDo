import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubscribeService {
  private apiUrl = 'https://todof.woopear.fr/api/v1/user/register'

  private http = inject(HttpClient)

  register(userData: { username: string; email: string; password: string, role?: string }) {
    const payload = { ...userData, role: userData.role || 'user' }
    return this.http.post(this.apiUrl, payload)
  }
}
