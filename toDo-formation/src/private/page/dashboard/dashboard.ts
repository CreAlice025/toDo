import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, JsonPipe } from '@angular/common';
import { AuthService } from '../../Services/auth-service/auth-service';
import { Header } from "../../../shared/header/header";
import { TasksList } from "../../components/tasks-list/tasks-list";
import { Button } from '../../../shared/button/button';
import { TaskForm } from "../../components/task-form/task-form";
import { Task } from '../../Services/task-service/task.model';
import { TaskService } from '../../Services/task-service/task-service';
import { Footer } from "../../../shared/footer/footer";

@Component({
  selector: 'app-dashboard',
  imports: [
    JsonPipe,
    Header,
    TasksList,
    Button,
    TaskForm,
    CommonModule,
    Footer
  ],
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})


export class Dashboard implements OnInit {
  private authService = inject(AuthService);
  private http = inject(HttpClient);
  private taskService = inject(TaskService)

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

  isLoading = signal(true)
  hasError = signal(false)
  tasks = signal<Task[]>([])

  get tasksValue() {
    return this.tasks()
  }

  ngOnInit() {
    this.loadTasks()
  }


  loadTasks() {
    this.isLoading.set(true);
    this.hasError.set(false);
    this.taskService.getTasksList().subscribe({
      next: (tasks) => {
        this.tasks.set(tasks);
        console.log(tasks)
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.hasError.set(true);
        this.isLoading.set(false);
      }
    });
  }

  showTaskForm = false

  openTaskForm() {
    this.showTaskForm = true
  }

  closeTaskForm() {
    this.showTaskForm = false
    this.loadTasks()
  }

}
