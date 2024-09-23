import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { selectCurrentBoard } from '../selectors/board.selector';
import { State } from '../reducers';
import { Board } from '../reducers/board.reducer';

import { ButtonComponent } from '../button/button.component';
import { ButtonDropdownComponent } from '../button-dropdown/button-dropdown.component';
import { DialogDeleteBoardComponent } from '../dialog-delete-board/dialog-delete-board.component';
import { DialogEditBoardComponent } from '../dialog-edit-board/dialog-edit-board.component';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AsyncPipe, ButtonComponent, ButtonDropdownComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  dialog = inject(MatDialog);
  dialogData!: Board;
  constructor(private store: Store<State>) {
    this.board$ = store.select(selectCurrentBoard)
    this.board$.subscribe( (b) => {
      this.dialogData = b;
    })
  }

  board$: Observable<Board>
  
  ngOnInit(): void {
    // console.log('store', this.store.state)
  }
  dialogDeleteRef!: MatDialogRef<DialogDeleteBoardComponent>;
  dialogEditRef!: MatDialogRef<DialogEditBoardComponent>;

  openDialogDeleteBoard() {
    this.dialogDeleteRef = this.dialog.open(DialogDeleteBoardComponent, {
      width: '480px'
    })
  };

  editBoard() {
    console.log('edit Board')
    this.dialogEditRef = this.dialog.open(DialogEditBoardComponent, {
      width: '480px',
      data: this.dialogData
    })
  }
  
}
