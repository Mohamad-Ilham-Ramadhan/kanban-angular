import { Component, inject, viewChildren, effect } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, FormArray, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { v4 as uuid } from 'uuid';

import { Store } from '@ngrx/store';
import { Column } from '../reducers/board.reducer';
import { create } from '../actions/board.action';

import { ButtonComponent } from '../button/button.component';
import { InputComponent } from '../input/input.component';

import { State } from '../reducers';
import { Observable } from 'rxjs';
import { BoardState } from '../reducers/board.reducer';

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
  constructor(private store: Store<State>) {
    effect(() => {
      this.columns()[this.form.controls.columns.length - 1].input?.nativeElement.focus()
    });
    this.board$ = this.store.select('board');
    this.board$.subscribe( board => {
      board.boards.forEach( b => this.boardNames.add(b.name.toLocaleLowerCase().trim()))
    })
  }
  board$: Observable<BoardState>;
  boardNames: Set<string> = new Set();

  dialogRef = inject(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);

  columns = viewChildren<InputComponent>('column');
  columnsName: (FormControl<string | null>|string)[][] = [];
  submitted: boolean = false;
  
  form = new FormGroup({
    name: new FormControl('', [Validators.required, this.uniqueName()]),
    columns: new FormArray([
      new FormControl('', [Validators.required, this.uniqueColumnName()]),
    ])
  });

  // unique board name validator
  uniqueName() {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = this.boardNames.has(control.value.toLowerCase().trim());
      return forbidden ? {forbiddenName: {value: control.value}} : null;
    };
  }
  uniqueColumnName() {
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
    const columnControl = new FormControl(inputEl, [Validators.required, this.uniqueColumnName()]);
    if (this.columnsName[index] === undefined) {
      this.columnsName.push([columnControl, inputEl.value])
    } else {
      this.columnsName[index][1] = inputEl.value;
    }
  }

  addNewColumn() {
    if (this.form.controls.columns.length === 6) return;
    const columnControl = new FormControl('', [Validators.required, this.uniqueColumnName()]);
    this.form.controls.columns.push(columnControl);
    // ==============
    this.columnsName.push([columnControl, ''])
  }

  removeColumn(index: number) {
    this.form.controls.columns.removeAt(index)
    // ==============
    this.columnsName.splice(index, 1);
  }

  submit(e: Event) {
    e.preventDefault();
    this.submitted = true;
    if (this.form.invalid) return;
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
