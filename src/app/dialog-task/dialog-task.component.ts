import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

import { CheckboxComponent } from '../checkbox/checkbox.component';
import { SelectComponent, Value } from '../select/select.component';
import { ButtonDropdownComponent } from '../button-dropdown/button-dropdown.component';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';

import { State } from '../reducers';
import { Column, Task} from '../reducers/board.reducer';
import { selectColumns, selectTask } from '../selectors/board.selector';
import { moveColumn, toggleSubtask, deleteTask } from '../actions/board.action';
import { DialogEditTaskComponent } from '../dialog-edit-task/dialog-edit-task.component';
@Component({
  selector: 'app-dialog-task',
  standalone: true,
  imports: [CheckboxComponent, SelectComponent, ButtonDropdownComponent, AsyncPipe],
  templateUrl: './dialog-task.component.html',
  styleUrl: './dialog-task.component.scss'
})
export class DialogTaskComponent {

  data = inject(MAT_DIALOG_DATA);
  columns$: Observable<Column[]>;
  columns: Value[] = [];
  task: Task = this.data.task;
  dialogRef = inject(MatDialogRef);
  dialog = inject(MatDialog)
  constructor(private store: Store<State>) {
    this.columns$ = store.select(selectColumns);
    this.columns$.subscribe( val => {
      this.columns = val.map( c => ({id: c.id, name: c.name}));
      // this.task = val[this.data.columnIndex].tasks[this.data.taskIndex];
    }).unsubscribe();
  }

  moveColumn(event: any) {
    this.store.dispatch(moveColumn({prevIndex: event.prevIndex, newIndex: event.newIndex, taskIndex: this.data.taskIndex}));
    this.columns$.subscribe( val => {
      this.data.taskIndex = val[event.newIndex].tasks.length - 1;
    }).unsubscribe();
  }

  toggleSubtask(event: any) {
    this.store.dispatch(toggleSubtask({columnIndex: this.data.columnIndex, taskIndex: this.data.taskIndex, subtaskIndex: event}))
  }

  dialogEditTaskRef!: MatDialogRef<DialogEditTaskComponent>;
  openDialogEditTask(task: Task) {
    this.dialog.closeAll();
    this.dialogEditTaskRef = this.dialog.open(DialogEditTaskComponent, {
      width: '480px',
      height: '100%',
      data: {
        task,
        columnIndex: this.data.columnIndex,
        taskIndex: this.data.taskIndex,
      }
    })
  }

  dialogDeleteTaskRef!: MatDialogRef<DialogDeleteComponent>;
  openDialogDeleteTask(task: Task) {
    this.dialog.closeAll();
    this.dialogDeleteTaskRef = this.dialog.open(DialogDeleteComponent, {
      width: '480px',
      height: '100%',
      data: {
        title: 'Delete this board?',
        description: `Are you sure you want to delete the '${task.title}' board? This action will remove all columns and tasks and cannot be reversed.`,
        delete: () => {
          this.store.dispatch(deleteTask({columnIndex: this.data.columnIndex, taskIndex: this.data.taskIndex}));
        }
      }
    })
  };
}
