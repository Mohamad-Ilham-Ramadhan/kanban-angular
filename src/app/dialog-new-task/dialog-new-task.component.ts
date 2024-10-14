import { Component, effect, inject, viewChildren } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectCurrentBoard } from '../selectors/board.selector';
import { Board, Column } from '../reducers/board.reducer';
import { State } from '../reducers';
import { addTask } from '../actions/board.action';

import { InputComponent } from '../input/input.component';
import { ButtonComponent } from '../button/button.component';
import { TextareaComponent } from '../textarea/textarea.component';
import { SelectComponent } from '../select/select.component';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-new-task',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, InputComponent, ButtonComponent, TextareaComponent, SelectComponent],
  templateUrl: './dialog-new-task.component.html',
  styleUrl: './dialog-new-task.component.scss'
})
export class DialogNewTaskComponent {

  form: FormGroup;
  subtasks = viewChildren<InputComponent>('column');
  dialogRef = inject(MatDialogRef)
  removeSubtask(index: number) {
    this.fa('subtasks').removeAt(index);
  }
  addNewSubtask() {
    this.fa('subtasks').push(new FormControl('', [Validators.required]));
  }
  
  submitted: boolean = false;
  submit(e: Event) {
    e.preventDefault();
    this.submitted = true;
    if (this.form.invalid) return;

    const { status, title, description, subtasks} = this.form.controls;

    this.store.dispatch(addTask({
      title: title.value === null ? '' : title.value,
      description: description.value === null ? '' : description.value,
      subtasks: subtasks.value === null ? [] : subtasks.value,
      status: status.value === null ? '' : status.value,
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
  constructor(private store: Store<State>, private fb: FormBuilder) {
    this.form = this.fb.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      subtasks: new FormArray([
        new FormControl('', [Validators.required])
      ]),
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
