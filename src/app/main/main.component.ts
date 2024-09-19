import { ChangeDetectionStrategy, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { DialogCreateNewBoardComponent } from '../dialog-create-new-board/dialog-create-new-board.component';
import { State } from '../reducers';

import { InputComponent } from '../input/input.component';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { selectBoards, selectActiveBoard, selectCurrentBoard } from '../selectors/board.selector';
import { Column, Board } from '../reducers/board.reducer';

import { CountPipe } from '../pipes/count.pipe';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterLink, CommonModule, AsyncPipe, InputComponent, FormsModule, ReactiveFormsModule, CountPipe],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  @ViewChild('aside') asideEl!: ElementRef;
  @ViewChild('main') mainEl!: ElementRef;

  form = new FormGroup({
    suka: new FormControl('')
  });

  boards$ = new Observable<any>();
  activeBoard$ = new Observable();
  currentBoard$ = new Observable<Board>();
  columns: Column[] = [];

  constructor(private store: Store<State>) {
    this.boards$ = store.select(selectBoards);
    this.activeBoard$ = store.select(selectActiveBoard);
    this.currentBoard$ = store.select(selectCurrentBoard);
    this.currentBoard$.subscribe( (cb: Board) => {
      console.log('cb', cb)
      this.columns = cb.columns;
    })
  }

  toggleSidebar() {
    console.log('this.asideEl', this.asideEl.nativeElement);
    // this.asideEl.nativeElement.classList.toggle('hide');
    this.mainEl.nativeElement.classList.toggle('hide');
  }

  dialog = inject(MatDialog);
  openDialog() {
    const dialogRef = this.dialog.open(DialogCreateNewBoardComponent, {
      width: '480px'
    })
  }
}
