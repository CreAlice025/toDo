import { Component, EventEmitter, inject, Output, signal, NgZone, output } from '@angular/core';
import { TaskService } from '../../Services/task-service/task-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../Services/task-service/task.model';

@Component({
  selector: 'app-task-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css'
})

export class TaskForm {
  private TaskService = inject(TaskService)
  private ngZone = inject(NgZone)

  @Output() refreshTasks = new EventEmitter<void>()

  label = signal("")
  description = signal("")
  done = signal(false)

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
        this.loading.set(false);
        this.TaskService.getTasksList().subscribe({
          next: (tasks) => {
            this.ngZone.run(() => {
              // this.tasks.set(tasks);
              this.refreshTasks.emit()
              this.close.emit();
            });
          },
          error: (err) => console.error('Erreur reload tasks', err)
        });
      },
      error: (err) => {
        this.loading.set(false);
        console.error('Erreur ajout tâche:', err);
      }
    });


  }

  cancel() {
    this.close.emit()
  }

}
