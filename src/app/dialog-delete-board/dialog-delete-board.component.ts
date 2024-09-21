import { Component, AfterViewInit, output, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

import { Board } from '../reducers/board.reducer';
import { selectCurrentBoard, selectActiveBoard } from '../selectors/board.selector';
import { State } from '../reducers';
import { deleteBoard } from '../actions/board.action';

import { ButtonComponent } from '../button/button.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-delete-board',
  standalone: true,
  imports: [AsyncPipe, ButtonComponent],
  templateUrl: './dialog-delete-board.component.html',
  styleUrl: './dialog-delete-board.component.scss'
})
export class DialogDeleteBoardComponent implements AfterViewInit {
  cancel = output();
  dialogRef = inject(MatDialogRef<DialogDeleteBoardComponent>)
  onCancel() {
    this.dialogRef.close()
  }
  onDelete() {
    this.store.dispatch(deleteBoard());
    this.dialogRef.close()
  }
  constructor(private store: Store<State>) {
    this.board$ = this.store.select(selectCurrentBoard);
  }

  board$: Observable<Board>;
  ngAfterViewInit(): void {
  }
}
