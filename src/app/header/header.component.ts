import { Component, OnInit, inject, ViewChild, ComponentRef } from '@angular/core';
import { AsyncPipe, NgClass } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

import { Store } from '@ngrx/store';
import { selectCurrentBoard } from '../selectors/board.selector';
import { State } from '../reducers';
import { Board } from '../reducers/board.reducer';
import { deleteBoard } from '../actions/board.action';

import { ButtonComponent } from '../button/button.component';
import { ButtonDropdownComponent } from '../button-dropdown/button-dropdown.component';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { DialogEditBoardComponent } from '../dialog-edit-board/dialog-edit-board.component';
import { DialogNewTaskComponent } from '../dialog-new-task/dialog-new-task.component';
import { DialogMobileMenuComponent} from '../dialog-mobile-menu/dialog-mobile-menu.component';

import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AsyncPipe, ButtonComponent, ButtonDropdownComponent, NgClass, AsyncPipe, RouterLink],
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
  theme$ = new Observable()
  constructor(private store: Store<State>, private fb: FormBuilder) {
    this.theme$ = store.select('theme');
    
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
  dialogDeleteRef!: MatDialogRef<DialogDeleteComponent>;
  dialogEditRef!: MatDialogRef<DialogEditBoardComponent>;
  dialogAddNewTask!: MatDialogRef<DialogNewTaskComponent>;
  
  openDialogDeleteBoard() {
    this.dialogDeleteRef = this.dialog.open(DialogDeleteComponent, {
      width: '480px',
      height: `${document.documentElement.clientWidth <= 766 ? '100%' : 'auto'}`, 
      data: {
        title: 'Delete this board?',
        description: `Are you sure you want to delete the '${this.dialogData.name}' board? This action will remove all columns and tasks and cannot be reversed`,
        delete: () => {
          this.store.dispatch(deleteBoard());
        }
      }
    })
  };

  editBoard() {
    console.log('edit Board')
    this.dialogEditRef = this.dialog.open(DialogEditBoardComponent, {
      width: '480px',
      height: `${document.documentElement.clientWidth <= 766 ? '100%' : 'auto'}`, 
      data: this.dialogData
    })
  }
  addNewTask() {
    // console.log('add new task');
    this.dialogAddNewTask = this.dialog.open(DialogNewTaskComponent, {
      width: '480px',
      height: `${document.documentElement.clientWidth <= 766 ? '100%' : 'auto'}`, 
      data: {
        title: 'Delete this board?',
        description: `Are you sure you want to delete the '${this.dialogData.name}' board? This action will remove all columns and tasks and cannot be reversed`,
      }
    })
  }

  menuOpen: boolean = false;
  openDialogMobileMenu() {
    this.menuOpen = true;
    console.log('')
    const dialogRef = this.dialog.open(DialogMobileMenuComponent, {
      width: '300px',
      maxHeight: '75vh',
      position: {
        top: '80px'
      }
    })
    const af = dialogRef.afterClosed();
    af.subscribe( () => {
      this.menuOpen = false;
    });
  }
}
