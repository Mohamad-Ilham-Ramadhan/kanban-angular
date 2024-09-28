import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

import { CheckboxComponent } from '../checkbox/checkbox.component';
import { SelectComponent, Value } from '../select/select.component';

import { State } from '../reducers';
import { Column } from '../reducers/board.reducer';
import { selectColumns } from '../selectors/board.selector';
import { moveColumn } from '../actions/board.action';
@Component({
  selector: 'app-dialog-task',
  standalone: true,
  imports: [CheckboxComponent, SelectComponent, AsyncPipe],
  templateUrl: './dialog-task.component.html',
  styleUrl: './dialog-task.component.scss'
})
export class DialogTaskComponent {
  data = inject(MAT_DIALOG_DATA);
  columns$: Observable<Column[]>;
  columns: Value[] = []
  constructor(private store: Store<State>) {
    console.log('data', this.data);
    this.columns$ = store.select(selectColumns);
    this.columns$.subscribe( val => {
      console.log('this.columns$.subscribe', val)
      this.columns = val.map( c => ({id: c.id, name: c.name}));
    });
  }

  moveColumn(event: any) {
    console.log('moveColumn ', event);
    this.store.dispatch(moveColumn({prevId: event.prevId, newId: event.newId, taskId: this.data.task.id}))
  }
}
