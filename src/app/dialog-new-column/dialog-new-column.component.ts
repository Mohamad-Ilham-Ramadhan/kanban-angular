import { Component, inject, viewChildren, effect } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid';

import { Store } from '@ngrx/store';
import { Column } from '../reducers/board.reducer';
import { create, newColumn } from '../actions/board.action';

import { ButtonComponent } from '../button/button.component';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'app-dialog-new-column',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, InputComponent, ButtonComponent],
  templateUrl: './dialog-new-column.component.html',
  styleUrl: './dialog-new-column.component.scss'
})
export class DialogNewColumnComponent {
  constructor() {
    // console.log('dialog new column constructor()', this.data);
    this.data= JSON.parse(JSON.stringify(this.data));
    this.form.controls.columns.clear();
    this.form.controls.columnsId.clear();
    this.columnsControl = this.data.columns.map((c: any) => ({name: c.name, id: c.id}));
    this.data.columns.forEach( (c: Column)=> {
      this.form.controls.columns.push(new FormControl(c.name, [Validators.required]));
      this.form.controls.columnsId.push(new FormControl(c.id));
    });
    this.form.controls.name.disable()
    effect(() => {
      this.columns()[this.form.controls.columns.length - 1].input?.nativeElement.focus()
    });
  }

  dialogRef = inject(MatDialogRef);
  store = inject(Store);
  data = inject(MAT_DIALOG_DATA)
  columnsControl: any[];
  
  columns = viewChildren<InputComponent>('column');
  submitted: boolean = false;
  
  form = new FormGroup({
    name: new FormControl(this.data.name, [Validators.required]),
    columns: new FormArray([
      new FormControl('', [Validators.required]),
    ]),
    columnsId: new FormArray([new FormControl('', [Validators.required])])
  });

  addNewColumn() {
    if (this.form.controls.columns.length === 6) return;
    this.form.controls.columns.push(new FormControl('', [Validators.required]));
    this.form.controls.columnsId.push(new FormControl(uuid(), [Validators.required]));
    this.data.columns.push({id: uuid(), name: '', tasks: []});
  }
  removeColumn(index: number) {
    this.form.controls.columns.removeAt(index)
    this.form.controls.columnsId.removeAt(index)
  }
  submit(e: Event) {
    e.preventDefault();
    this.submitted = true;
    if (this.form.invalid) return;
    const { name, columns, columnsId } = this.form.controls;

    let columnNames: string[] = columns.controls.map( (c) => c.value === null ? '' : c.value);
    let ids: Set<string> = new Set();
    columnsId.controls.forEach( c => {
      ids.add(c.value === null ? '' : c.value);
    })
    this.store.dispatch(newColumn({columnNames, ids}));
    this.dialogRef.close();
  }

}
