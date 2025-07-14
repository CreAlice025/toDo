import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Task } from './task.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  private baseUrl = 'https://todof.woopear.fr/api/v1/task'
  private http = inject(HttpClient)


  getTasksList(): Observable<Task[]> {
    return this.http.get<{ data: Task[], error: any, message: string }>(this.baseUrl).pipe(map(response => response.data))
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, task)
  }

  deleteTask(id: string): Observable<void> {
    const url = `${this.baseUrl}/${id}/user`
    return this.http.delete<void>(url)
  }

  editTaskLabel(id: string, label: string): Observable<Task> {
    const url = `${this.baseUrl}/${id}/label/user`
    return this.http.put<Task>(url, { label })
  }

  editTaskStatus(id: string, done: boolean): Observable<Task> {
    const url = `${this.baseUrl}/${id}/done/user`
    return this.http.put<Task>(url, { done })
  }

}
