import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ButtonComponent } from '../button/button.component';
import { ButtonDropdownComponent } from '../button-dropdown/button-dropdown.component';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent, ButtonDropdownComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  constructor(private store: Store) {
    // @ts-ignore
    this.theme$ = store.select('count')
  }
  theme$: Observable<string>;
  ngOnInit(): void {
    // console.log('store', this.store.state)
  }

}
