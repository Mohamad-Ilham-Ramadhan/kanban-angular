import { Component, AfterViewInit, output, inject, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

import { Board } from '../reducers/board.reducer';
import { selectCurrentBoard } from '../selectors/board.selector';
import { State } from '../reducers';
import { deleteBoard } from '../actions/board.action';

import { ButtonComponent } from '../button/button.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-delete',
  standalone: true,
  imports: [AsyncPipe, ButtonComponent],
  templateUrl: './dialog-delete.component.html',
  styleUrl: './dialog-delete.component.scss'
})
export class DialogDeleteComponent implements AfterViewInit {
  @Input() title: string = '';
  @Input() description: string = '';
  
  cancel = output();
  dialogRef = inject(MatDialogRef<DialogDeleteComponent>);
  data = inject(MAT_DIALOG_DATA);

  onCancel() {
    if (this.data.cancel) {
      this.data.cancel()
    }
    this.dialogRef.close()
  }
  onDelete() {
    if (this.data.delete) {
      this.data.delete();
    }
    this.dialogRef.close()
  }
  constructor(private store: Store<State>) {
    // console.log('this.data', this.data);
    this.board$ = this.store.select(selectCurrentBoard);
  }

  board$: Observable<Board>;
  ngAfterViewInit(): void {
  }
}
