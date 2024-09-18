import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import {create} from '../actions/board.action';
import { BoardState } from '../reducers/board.reducer';

@Component({
  selector: 'app-coba-create-board',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, AsyncPipe, MatSlideToggleModule],
  templateUrl: './coba-create-board.component.html',
  styleUrl: './coba-create-board.component.scss'
})
export class CobaCreateBoardComponent {
  constructor(private store: Store<{board: BoardState}>) {
    this.board$ = store.select('board');
    this.board$.subscribe(val => {
      console.log('board$.subscribe val', val)
    });
  }
  form = new FormGroup({
    name: new FormControl(''),
  });

  board$: Observable<BoardState>

  formSubmit(e: Event) {
    e.preventDefault();
    const { name } = this.form.controls;
    console.log('name', name.value?.toString());
    // this.store.dispatch(create({name: name.value ? name.value : ''}))
  }
}
