import { Component, OnInit, inject, ViewChild, ComponentRef } from '@angular/core';
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
import { DialogNewTaskComponent } from '../dialog-new-task/dialog-new-task.component';

import { FormBuilder, FormGroup } from '@angular/forms';
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

  form: FormGroup;
  incrementSlider() {
    this.form.get('slider')?.patchValue(this.form.get('slider')?.value + 1)
  }
  constructor(private store: Store<State>, private fb: FormBuilder) {
    this.form = this.fb.group({
      slider: [50]
    });

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
  dialogAddNewTask!: MatDialogRef<DialogNewTaskComponent>;
  
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
  addNewTask() {
    console.log('add new task');
    this.dialogAddNewTask = this.dialog.open(DialogNewTaskComponent, {
      width: '480px',
      
    })
  }



  
}
