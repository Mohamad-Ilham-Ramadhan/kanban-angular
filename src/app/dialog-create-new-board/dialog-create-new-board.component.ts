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
import { BoardState, Board } from '../reducers/board.reducer';

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
      board.boards.forEach( b => this.boardNames.add(b.name))
    })
  }
  board$: Observable<BoardState>;
  boardNames: Set<string> = new Set();

  dialogRef = inject(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);

  columns = viewChildren<InputComponent>('column');
  submitted: boolean = false;
  
  form = new FormGroup({
    name: new FormControl('', [Validators.required, this.uniqueName()]),
    columns: new FormArray([
      new FormControl('', [Validators.required]),
    ])
  });

  // unique board name validator
  uniqueName() {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = this.boardNames.has(control.value);
      return forbidden ? {forbiddenName: {value: control.value}} : null;
    };
  }
  
  addNewColumn() {
    if (this.form.controls.columns.length === 6) return;
    this.form.controls.columns.push(new FormControl('', [Validators.required]))
  }
  removeColumn(index: number) {
    this.form.controls.columns.removeAt(index)
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
