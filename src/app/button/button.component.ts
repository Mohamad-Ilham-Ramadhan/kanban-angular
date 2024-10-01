import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgClass, AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass, AsyncPipe],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input('type') type: 'button' | 'submit' = 'button';
  @Input('size') size: 'medium' | 'small' = 'medium';
  @Input('color') color: 'primary' | 'white' | 'danger' = 'primary';
  @Input('classes') classes: string = '';
  theme$ = new Observable();
  constructor(private store: Store<State>) {
    this.theme$ = store.select('theme');
  }
}
