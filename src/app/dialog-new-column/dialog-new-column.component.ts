import { Component, inject, viewChildren, effect } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, FormArray, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { v4 as uuid } from 'uuid';

import { Store } from '@ngrx/store';
import { Column } from '../reducers/board.reducer';
import { newColumn } from '../actions/board.action';

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
      const columnControl = new FormControl(c.name, [Validators.required, this.uniqueName()]);
      this.form.controls.columns.push(columnControl);
      this.form.controls.columnsId.push(new FormControl(c.id));
      this.columnsName.push([columnControl, c.name.toLocaleLowerCase().trim()])
    });
    this.form.controls.name.disable()
    effect(() => {
      this.columnsEl()[this.form.controls.columns.length - 1].input?.nativeElement.focus()
    });

  }

  dialogRef = inject(MatDialogRef);
  store = inject(Store);
  data = inject(MAT_DIALOG_DATA)
  columnsControl: any[];
  
  columnsName: (FormControl<string | null>|string)[][] = [];
  columnsEl = viewChildren<InputComponent>('column');
  submitted: boolean = false;
  
  form = new FormGroup({
    name: new FormControl(this.data.name, [Validators.required]),
    columns: new FormArray([
      new FormControl('', [Validators.required, this.uniqueName()]),
    ]),
    columnsId: new FormArray([new FormControl('', [Validators.required])])
  });

  // unique board name validator
  uniqueName() {
    return (control: AbstractControl): ValidationErrors | null => {
      if (typeof control.value !== 'string') return null;
      let forbidden = false;
      for (let i = 0; i < this.columnsName.length; i++) {
        const [c,v] = this.columnsName[i];
        if (control === c) break;
        if ((v as string).toLowerCase().trim() === control.value.toLocaleLowerCase().trim()) {
          forbidden = true;
          break;
        }
      }
      return forbidden ? {forbiddenName: {value: control.value}} : null;
    };
  }

  inputColumnFocusout(event: FocusEvent, index: number) {
    const inputEl = (event.target as HTMLInputElement);
    const columnControl = new FormControl(inputEl, [Validators.required, this.uniqueName()]);
    if (this.columnsName[index] === undefined) {
      this.columnsName.push([columnControl, inputEl.value])
    } else {
      this.columnsName[index][1] = inputEl.value;
    }
      this.columnsName[index][1] = inputEl.value;
  }

  addNewColumn() {
    if (this.form.controls.columns.length === 6) return;
    const columnControl = new FormControl('', [Validators.required, this.uniqueName()]);
    this.form.controls.columns.push(columnControl);
    this.form.controls.columnsId.push(new FormControl(uuid(), [Validators.required]));
    this.data.columns.push({id: uuid(), name: '', tasks: []});
    // ==============
    this.columnsName.push([columnControl, ''])
  }

  removeColumn(index: number) {
    this.form.controls.columns.removeAt(index)
    this.form.controls.columnsId.removeAt(index)
    // =============
    this.columnsName.splice(index, 1);
  }

  submit(e: Event) {
    e.preventDefault();
    this.submitted = true;

    (this.form.get('columns') as FormArray)?.controls.forEach((c: AbstractControl) => {
      c.updateValueAndValidity()
    });
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
