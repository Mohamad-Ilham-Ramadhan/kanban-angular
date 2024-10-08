import { Component } from '@angular/core';
import { animate, trigger, transition, style, state, AnimationEvent } from '@angular/animations';
import { NgIf, AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MainComponent } from '../main/main.component';
import { HeaderComponent } from '../header/header.component';
import { State } from '../reducers';
import { Task } from '../reducers/coba.reducer';
import { swapTask } from '../actions/coba.action';
@Component({
  selector: 'app-coba',
  standalone: true,
  imports: [NgIf, AsyncPipe, HeaderComponent, MainComponent],
  templateUrl: './coba.component.html',
  styleUrl: './coba.component.scss',
})
export class CobaComponent {
  tasks$ = new Observable<Task[]>();
  fromIndex: number = 0;
  fromIndexChange(e: Event) {
    this.fromIndex = Number((e.target as HTMLInputElement).value)
  }
  toIndex: number = 0;
  toIndexChange(e: Event) {
    this.toIndex = Number((e.target as HTMLInputElement).value)
  }
  moveTask() {
    console.log('move tasks');
    console.log('fromIndex', this.fromIndex);
    console.log('toIndex', this.toIndex);
    this.store.dispatch(swapTask({fromIndex: this.fromIndex, toIndex: this.toIndex}));
  }
  constructor(private store: Store<State>) {
    this.tasks$ = store.select('coba');
  }
}
