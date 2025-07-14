import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { TaskService } from '../../../Services/task-service/task-service';
import { Task } from '../../../Services/task-service/task.model';
import { Button } from "../../../shared/button/button";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks-list',
  imports: [Button, CommonModule],
  standalone: true,
  templateUrl: './tasks-list.html',
  styleUrl: './tasks-list.css'
})
export class TasksList implements OnInit {
  private taskService = inject(TaskService)
  private cdr = inject(ChangeDetectorRef)

  tasks = signal<Task[]>([])
  isLoading = signal(true)
  hasError = signal(false)

  ngOnInit(): void {
    this.taskService.getTasksList().subscribe({
      next: (response) => {
        this.tasks.set(response)
        console.log(response)
        this.isLoading.set(false)
        this.hasError.set(false)
        this.cdr.detectChanges()
      },
      error: (err) => {
        console.error('Erreur :', err)
        this.isLoading.set(false)
        this.hasError.set(true)
      }
    })
  }
  toggleTaskDone(task: Task) {
    this.taskService.editTaskStatus(task.id!, !task.done).subscribe({
      next: (updatedTask) => {
        task.done = updatedTask.done
      },
      error: (err) => {
        console.error('Erreur toggle:', err)
      }
    });
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.tasks.set(this.tasks().filter(task => task.id !== id))
      },
      error: (err) => {
        console.error('Erreur delete:', err)
      }
    });
  }

  editTaskLabel(task: Task) {
    const newLabel = prompt('Nouveau label ?', task.label)
    if (newLabel && newLabel !== task.label) {
      this.taskService.editTaskLabel(task.id!, newLabel).subscribe({
        next: (updatedTask) => {
          task.label = updatedTask.label
        },
        error: (err) => {
          console.error('Erreur edit label:', err)
        }
      })
    }
  }


}
