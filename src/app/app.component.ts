import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { selectFeatureTheme } from './selectors/theme.selector';
import { setTheme } from './actions/theme.action';
import { State } from './reducers';
import { getStateFromLocalStorage } from './actions/board.action';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { BoardState } from './reducers/board.reducer';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, MainComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit  {
  constructor(@Inject(DOCUMENT) private document: Document, private store: Store<State>) {
    this.theme$ = this.store.select(selectFeatureTheme);
    this.board$ = this.store.select('board');
   
  }
  theme$: Observable<string>;
  board$: Observable<BoardState>;
  loading: boolean = true;
  firstInit = true;
  ngOnInit(): void {
    const theme = JSON.parse(localStorage.getItem('theme') || '{}');
    if (theme) {
        this.store.dispatch(setTheme({theme}))
    }
    this.store.dispatch(getStateFromLocalStorage()); // board state
    this.theme$.subscribe( val => {
      if (val === 'dark') {
        this.document.body.classList.add(val)
      } else {
        this.document.body.classList.remove('dark')
      }
    });
    this.board$.subscribe( val => {
      this.loading = false;
    }).unsubscribe()
    this.firstInit = false;
  }
}
