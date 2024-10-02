import { ChangeDetectionStrategy, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormGroup,  FormsModule, ReactiveFormsModule, FormBuilder} from '@angular/forms';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogCreateNewBoardComponent } from '../dialog-create-new-board/dialog-create-new-board.component';
import { DialogNewColumnComponent } from '../dialog-new-column/dialog-new-column.component';
import { DialogTaskComponent } from '../dialog-task/dialog-task.component';
import { InputComponent } from '../input/input.component';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { SwitchThemeComponent } from '../switch-theme/switch-theme.component';

import { State } from '../reducers';
import { selectBoards, selectActiveBoard, selectCurrentBoard } from '../selectors/board.selector';
import { Column, Board, Task } from '../reducers/board.reducer';
import { setActiveBoard } from '../actions/board.action';
import { toggleTheme } from '../actions/theme.action';

import { CountPipe } from '../pipes/count.pipe';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterLink, CommonModule, AsyncPipe, InputComponent, FormsModule, ReactiveFormsModule, CountPipe, SwitchThemeComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  @ViewChild('aside') asideEl!: ElementRef;
  @ViewChild('main') mainEl!: ElementRef;

  form: FormGroup;

  boards$ = new Observable<any>();
  activeBoard$ = new Observable();
  currentBoard$ = new Observable<Board>();
  columns: Column[] = [];
  dialogData: any;
  theme$ = new Observable();

  constructor(private store: Store<State>, private fb : FormBuilder) {
    this.form = this.fb.group({
      select: '1'
    });
    this.form.get('select')?.valueChanges.subscribe( (val) => {
      console.log("this.form.get('select')?.valueChanges.subscribe", val)
    });

    this.theme$ = store.select('theme');
    this.theme$.subscribe( val => {
      console.log('val', val);
    });
    
    this.boards$ = store.select(selectBoards);
    this.activeBoard$ = store.select(selectActiveBoard);
    this.currentBoard$ = store.select(selectCurrentBoard);
    this.currentBoard$.subscribe( (cb: Board) => {
      this.columns = cb.columns;
      this.dialogData = {
        name: cb.name,
        columns: cb.columns
      }
    })
  }

  toggleTheme() {
    this.store.dispatch(toggleTheme());
  }

  toggleSidebar() {
    this.mainEl.nativeElement.classList.toggle('hide');
  }

  chooseBoard(index: number) {
    this.store.dispatch(setActiveBoard({index}))
  }


  dialog = inject(MatDialog);
  openDialogNewBoard() {
    const dialogRef = this.dialog.open(DialogCreateNewBoardComponent, {
      width: '480px'
    });
  }
  openDialogNewColumn() {
    const dialogRef = this.dialog.open(DialogNewColumnComponent, {
      width: '480px',
      data: this.dialogData
    });
  }
  
  openDialogTask(task: Task, columnIndex: number, taskIndex: number) {
    const dialogRef = this.dialog.open(DialogTaskComponent, {
      width: '480px',
      height: '100%',
      data: {task, columnIndex, taskIndex}
    });
  }

  dialogDeleteTaskRef!: MatDialogRef<DialogDeleteComponent>;
  openDialogDeleteTask(task: Task) {
    this.dialogDeleteTaskRef = this.dialog.open(DialogDeleteComponent, {
      width: '480px',
      data: {
        title: 'Delete this board?',
        description: `Are you sure you want to delete the '${task.title}' board? This action will remove all columns and tasks and cannot be reversed.`,
        delete: () => {
          alert('delete task');
        }
      }
    })
  };
}
