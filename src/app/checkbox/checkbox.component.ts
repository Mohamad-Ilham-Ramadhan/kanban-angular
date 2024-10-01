import { Component, Input } from '@angular/core';
import { NgClass, AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectTheme } from '../selectors/theme.selector';
import { State } from '../reducers';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [NgClass, AsyncPipe],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss'
})
export class CheckboxComponent {
  constructor(private store: Store<State>) {
    this.theme$ = store.select(selectTheme);
  }
  theme$ = new Observable()
  @Input() text: string = '';
  @Input() checked: boolean = false;
}
