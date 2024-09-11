import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { selectFeatureTheme, AppState } from './selectors/theme.selector';
import { toggleTheme } from './actions/theme.action';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit  {
  constructor(@Inject(DOCUMENT) private document: Document, private store: Store<AppState>) {
    this.theme$ = this.store.select(selectFeatureTheme)
  }
  theme$: Observable<string>
  ngOnInit(): void {
    this.theme$.subscribe( val => {
      if (val === 'dark') {
        this.document.body.classList.add(val)
      } else {
        this.document.body.classList.remove('dark')
      }
    })
  }
}
