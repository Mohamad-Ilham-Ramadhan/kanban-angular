import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input('type') type: 'button' | 'submit' = 'button';
  @Input('size') size: 'medium' | 'small' = 'medium';
  @Input('color') color: 'primary' | 'white' = 'primary';
  @Input('classes') classes: string = '';
  
}
