import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ButtonComponent } from '../button/button.component';
import { ButtonDropdownComponent } from '../button-dropdown/button-dropdown.component';
import { CobaComponent } from '../coba/coba.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent, ButtonDropdownComponent, CobaComponent],
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

  // onAnimationEvent(event: AnimationEvent) {
  //   // openClose is trigger name in this example
  //   console.warn(`Animation Trigger: ${event.triggerName}`);
  //   // phaseName is "start" or "done"
  //   console.warn(`Phase: ${event.phaseName}`);
  //   // in our example, totalTime is 1000 (number of milliseconds in a second)
  //   console.warn(`Total time: ${event.totalTime}`);
  //   // in our example, fromState is either "open" or "closed"
  //   console.warn(`From: ${event.fromState}`);
  //   // in our example, toState either "open" or "closed"
  //   console.warn(`To: ${event.toState}`);
  //   // the HTML element itself, the button in this case
  //   console.warn(`Element: ${event.element}`);
  // }

}
