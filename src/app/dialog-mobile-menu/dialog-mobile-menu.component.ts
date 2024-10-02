import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgClass, AsyncPipe } from '@angular/common';
import { State } from '../reducers';
import { selectBoards } from '../selectors/board.selector';
import { Board } from '../reducers/board.reducer';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { SwitchThemeComponent } from '../switch-theme/switch-theme.component';
import { DialogCreateNewBoardComponent } from '../dialog-create-new-board/dialog-create-new-board.component';
@Component({
  selector: 'app-dialog-mobile-menu',
  standalone: true,
  imports: [NgClass, AsyncPipe, SwitchThemeComponent],
  templateUrl: './dialog-mobile-menu.component.html',
  styleUrl: './dialog-mobile-menu.component.scss'
})
export class DialogMobileMenuComponent {
  dialogRef = inject(MatDialogRef<DialogMobileMenuComponent>);
  boards$ = new Observable<Board[]>();
  dialog = inject(MatDialog);
  constructor(private store: Store<State>) {
    this.boards$ = store.select(selectBoards);
    console.log('this.dialog', this.dialogRef);
  }

  openDialogCreateNewBoard() {
    this.dialogRef.close();
    const dialogRef = this.dialog.open(DialogCreateNewBoardComponent, {
      width: '480px',
      height: '100%'
    });
  }
}
