import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, FormArray } from '@angular/forms';
import { v4 as uuid } from 'uuid';

import { Store } from '@ngrx/store';
import { Column } from '../reducers/board.reducer';
import { create } from '../actions/board.action';

import { ButtonComponent } from '../button/button.component';
import { InputComponent } from '../input/input.component';

export interface DialogData {
  name: string;
  columns: Column[]
}

@Component({
  selector: 'app-dialog-create-new-board',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ButtonComponent, InputComponent],
  templateUrl: './dialog-create-new-board.component.html',
  styleUrl: './dialog-create-new-board.component.scss'
})
export class DialogCreateNewBoardComponent {
  dialogRef = inject(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  store = inject(Store);

  form = new FormGroup({
    name: new FormControl(''),
    columns: new FormArray([
      new FormControl(''),
    ])
  });
  addNewColumn() {
    this.form.controls.columns.push(new FormControl(''))
  }
  removeColumn(index: number) {
    this.form.controls.columns.removeAt(index)
  }
  submit(e: Event) {
    e.preventDefault();
    const { name, columns } = this.form.controls;
    let columnsValue: any[] = [];
    this.form.controls.columns.controls.forEach( (control, index) => {
      columnsValue.push(
        {
          id: uuid(),
          name: control.value,
          tasks: []
        }
      )
    });
    this.store.dispatch(create({columns: columnsValue, name: name.value ? name.value : ''}));
    this.dialogRef.close();
  }
}
