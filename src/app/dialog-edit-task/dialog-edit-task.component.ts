import { Component, effect, inject, viewChildren } from '@angular/core';
import { NgClass, AsyncPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';

import { selectCurrentBoard } from '../selectors/board.selector';
import { Board, Column, Subtask } from '../reducers/board.reducer';
import { State } from '../reducers';
import { editTask } from '../actions/board.action';

import { InputComponent } from '../input/input.component';
import { ButtonComponent } from '../button/button.component';
import { TextareaComponent } from '../textarea/textarea.component';
import { SelectComponent } from '../select/select.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-edit-task',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, InputComponent, ButtonComponent, TextareaComponent, SelectComponent, NgClass, AsyncPipe],
  templateUrl: './dialog-edit-task.component.html',
  styleUrl: './dialog-edit-task.component.scss'
})
export class DialogEditTaskComponent {

  form: FormGroup;
  subtasks = viewChildren<InputComponent>('column');
  dialogRef = inject(MatDialogRef);
  dialogData = inject(MAT_DIALOG_DATA);
  subtasksForm = [...this.dialogData.task.subtasks];

  removeSubtask(index: number) {
    this.fa('subtasks').removeAt(index);
    console.log('this.dialogData.task.subtasks is sealed', Object.isSealed(this.dialogData.task.subtasks));
    this.subtasksForm.splice(index, 1);
  }
  addNewSubtask() {
    this.fa('subtasks').push(new FormControl('', [Validators.required]));
    this.subtasksForm.push({id: uuid(), title: '', isDone: false})
  }
  
  submitted: boolean = false;
  submit(e: Event) {
    e.preventDefault();
    this.submitted = true;
    if (this.form.invalid) return;

    const { status, title, description, subtasks} = this.form.controls;

    // console.log('status', status.value);
    // console.log('title', title.value);
    // console.log('description', description.value);
    // console.log('subtasks', subtasks.value);
    // console.log('this.subtasksForm', this.subtasksForm);

    this.subtasksForm = this.subtasksForm.map((s, idx) => ({...s, title: subtasks.value[idx]}) );
    this.store.dispatch(editTask({
      title: title.value === null ? '' : title.value,
      description: description.value === null ? '' : description.value,
      subtasks: this.subtasksForm,
      status: status.value === null ? '' : status.value,
      columnIndex: this.dialogData.columnIndex,
      taskIndex: this.dialogData.taskIndex,
    }));

    this.dialogRef.close()
  }

  fc(name: string) { 
    return this.form.get(name) as FormControl; 
  }
  fa(name: string) {
    return this.form.get(name) as FormArray;
  }

  get subtasksControls() {
    return this.fa('subtasks').controls as FormControl[]
  }

  board$: Observable<Board>;
  columns: Column[] = [];
  theme$ = new Observable();
  constructor(private store: Store<State>, private fb: FormBuilder) {
    this.theme$ = this.store.select('theme');
    this.form = this.fb.group({
      title: new FormControl(this.dialogData.task.title, [Validators.required]),
      description: new FormControl(this.dialogData.task.description),
      subtasks: new FormArray(this.dialogData.task.subtasks.map( (s: Subtask) => new FormControl(s.title, [Validators.required]))),
      status: [''],
    });

    // =======================================

    this.board$ = store.select(selectCurrentBoard);
    this.board$.subscribe( val => {
      this.columns = val.columns;
    });

    effect(() => {
      this.subtasks()[this.fa('subtasks')?.length - 1].input?.nativeElement.focus()
    })
  }
}
