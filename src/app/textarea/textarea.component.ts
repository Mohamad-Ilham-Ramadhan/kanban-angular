import { Component, Input } from '@angular/core';
import { NgClass, AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, AsyncPipe],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss'
})
export class TextareaComponent {
  @Input() control!: FormControl;
  @Input() isError: boolean = false;
  @Input() rows!: string | number;
  theme$ = new Observable();
  constructor(private store: Store<State>) {
    this.theme$ = store.select('theme');
  }
}
