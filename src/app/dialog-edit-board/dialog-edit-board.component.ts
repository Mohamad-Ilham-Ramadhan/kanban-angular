import { Component, inject, viewChildren, effect } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, FormArray, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { v4 as uuid } from 'uuid';
import { Observable } from 'rxjs';
import { NgClass, AsyncPipe } from '@angular/common';

import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { BoardState, Column } from '../reducers/board.reducer';
import { editBoard } from '../actions/board.action';

import { ButtonComponent } from '../button/button.component';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'app-dialog-edit-board',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, InputComponent, ButtonComponent, NgClass, AsyncPipe],
  templateUrl: './dialog-edit-board.component.html',
  styleUrl: './dialog-edit-board.component.scss'
})
export class DialogEditBoardComponent {
  constructor() {
    this.theme$ = this.store.select('theme');
    this.data = JSON.parse(JSON.stringify(this.data));
    // console.log('this.data.columns', this.data.columns)
    this.form.controls.columns.clear();
    this.form.controls.columnsId.clear();
    this.columnsControl = this.data.columns.map((c: any) => ({name: c.name, id: c.id}));
    this.data.columns.forEach( (c: Column)=> {
      this.form.controls.columns.push(new FormControl(c.name, [Validators.required]));
      this.form.controls.columnsId.push(new FormControl(c.id));
    });
    this.board$ = this.store.select('board');
    this.board$.subscribe( board => {
      board.boards.forEach( b => {
        if (b.name.toLocaleLowerCase().trim() === this.data.name.toLocaleLowerCase().trim()) return;
        this.boardNames.add(b.name.toLocaleLowerCase().trim())
      })
    })

    effect(() => {
      this.columns()[this.form.controls.columns.length - 1].input?.nativeElement.focus()
    });
  }
  board$ = new Observable<BoardState>();
  theme$ = new Observable();
  dialogRef = inject(MatDialogRef);
  data = inject(MAT_DIALOG_DATA)
  columnsControl: any[];
  store = inject<Store<State>>(Store);
  
  columns = viewChildren<InputComponent>('column');
  submitted: boolean = false;
  boardNames: Set<string> = new Set();
  
  form = new FormGroup({
    name: new FormControl(this.data.name, [Validators.required, this.uniqueName()]),
    columns: new FormArray([
      new FormControl('', [Validators.required]),
    ]),
    columnsId: new FormArray([new FormControl('', [Validators.required])])
  });
  // unique board name validator
  uniqueName() {
    return (control: AbstractControl): ValidationErrors | null => {
      
      const forbidden = this.boardNames.has(control.value.toLowerCase().trim());
      return forbidden ? {forbiddenName: {value: control.value}} : null;
    };
  }
  addNewColumn() {
    if (this.form.controls.columns.length === 6) return;
    this.form.controls.columns.push(new FormControl('', [Validators.required]));
    this.form.controls.columnsId.push(new FormControl(uuid(), [Validators.required]));
    // console.log('this.data.columns isSealed', Object.isSealed(this.data.columns))
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
    this.store.dispatch(editBoard({boardName: name.value, columnNames, ids}));
    this.dialogRef.close();
  }

}
