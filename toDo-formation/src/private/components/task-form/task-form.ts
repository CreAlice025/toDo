import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { TaskService } from '../../../Services/task-service/task-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Task } from '../../../Services/task-service/task.model';

@Component({
  selector: 'app-task-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css'
})

export class TaskForm {
  private TaskService = inject(TaskService)
  private router = inject(Router);

  readonly label = signal("")
  readonly description = signal("")
  readonly done = signal(false)

  loading = signal(false);
  errorMessage = signal('');

  @Output() close = new EventEmitter<void>()

  setDone(event: Event) {
    const input = event.target as HTMLInputElement;
    this.done.set(input.checked);
  }

  setLabel(event: Event) {
    const input = event.target as HTMLInputElement;
    this.label.set(input.value);
  }

  submitForm() {
    if (!this.label()) return;

    this.loading.set(true);
    this.errorMessage.set('');

    const newTask: Task = {
      label: this.label(),
      done: this.done()
    }


    this.TaskService.addTask(newTask).subscribe({
      next: () => {
        this.loading.set(false)
        this.router.navigate(['/dashboard'])
      },
      error: (error) => {
        this.loading.set(false)
        this.errorMessage.set("La tâche n'est pas valide")
      }
    })

    this.close.emit()
  }

  cancel() {
    this.close.emit()
  }

}
