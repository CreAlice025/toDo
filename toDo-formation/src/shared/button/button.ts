import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  @Input() label: string = 'Click'
  @Input() variant: 'add' | 'delete' | 'edit' = 'add'
  @Input() type: 'button' | 'submit' | 'reset' = 'button'
  @Input() disabled = false
  @Output() action = new EventEmitter<void>()


  onClick() {
    this.action.emit()
  }
}

