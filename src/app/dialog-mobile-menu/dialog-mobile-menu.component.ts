import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgClass, AsyncPipe } from '@angular/common';
import { State } from '../reducers';
import { Board } from '../reducers/board.reducer';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { MatDialogModule } from '@angular/material/dialog';

import { SwitchThemeComponent } from '../switch-theme/switch-theme.component';
import { DialogCreateNewBoardComponent } from '../dialog-create-new-board/dialog-create-new-board.component';

import { selectBoards, selectActiveBoard } from '../selectors/board.selector';
import { setActiveBoard } from '../actions/board.action';
@Component({
  selector: 'app-dialog-mobile-menu',
  standalone: true,
  imports: [NgClass, AsyncPipe, SwitchThemeComponent, MatDialogModule],
  templateUrl: './dialog-mobile-menu.component.html',
  styleUrl: './dialog-mobile-menu.component.scss'
})
export class DialogMobileMenuComponent {
  dialogRef = inject(MatDialogRef<DialogMobileMenuComponent>);
  dialog = inject(MatDialog);
  boards$ = new Observable<Board[]>();
  activeBoard$ = new Observable<number>();
  constructor(private store: Store<State>) {
    this.boards$ = store.select(selectBoards);
    this.activeBoard$ = store.select(selectActiveBoard);
    console.log('this.dialog', this.dialogRef);

    this.dialogRef.addPanelClass('coba-coba')
  }

  openDialogCreateNewBoard() {
    this.dialogRef.close('Allah');
    const dialogRef = this.dialog.open(DialogCreateNewBoardComponent, {
      width: '480px',
      height: '100%',
      maxHeight: '100%',
    });
  }

  chooseBoard(index: number) {
    this.store.dispatch(setActiveBoard({index}))
  }
}
