import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrl: './button.css'
})
export class Button {
  @Input() label: string = 'Click'
  @Input() variant: 'add' | 'delete' | 'edit' = 'add'
  @Output() action = new EventEmitter<void>()

  onClick() {
    this.action.emit()
  }
}

