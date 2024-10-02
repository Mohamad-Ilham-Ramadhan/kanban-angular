import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgClass, AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { State } from '../reducers';
import { toggleTheme } from '../actions/theme.action';

@Component({
  selector: 'app-switch-theme',
  standalone: true,
  imports: [NgClass, AsyncPipe],
  templateUrl: './switch-theme.component.html',
  styleUrl: './switch-theme.component.scss'
})
export class SwitchThemeComponent {
  theme$ = new Observable();
  constructor(private store: Store<State>) {
    this.theme$ = store.select('theme');
  }
  toggleTheme() {
    this.store.dispatch(toggleTheme())
  }
}
