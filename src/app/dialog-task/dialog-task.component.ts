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
import { selectColumns } from '../selectors/board.selector';
import { moveColumn, toggleSubtask, deleteTask } from '../actions/board.action';
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
  dialog = inject(MatDialog)

  constructor(private store: Store<State>) {
    this.columns$ = store.select(selectColumns);
    this.columns$.subscribe( val => {
      console.log('this.columns$.subscribe', this.data.taskIndex)
      this.columns = val.map( c => ({id: c.id, name: c.name}));
      this.task = val[this.data.columnIndex].tasks[this.data.taskIndex];
    });
  }

  moveColumn(event: any) {
    this.store.dispatch(moveColumn({prevId: event.prevId, newId: event.newId, taskId: this.data.task.id}))
  }
  toggleSubtask(event: any) {
    this.store.dispatch(toggleSubtask({columnIndex: this.data.columnIndex, taskIndex: this.data.taskIndex, subtaskIndex: event}))
  }

  editTask() {}

  dialogDeleteTaskRef!: MatDialogRef<DialogDeleteComponent>;
  openDialogDeleteTask(task: Task) {
    this.dialog.closeAll();
    this.dialogDeleteTaskRef = this.dialog.open(DialogDeleteComponent, {
      width: '480px',
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
