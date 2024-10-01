import { Component, ElementRef, Input, ViewChild, AfterViewInit } from '@angular/core';
import { NgClass, AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { Observable } from 'rxjs';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, AsyncPipe],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent  {
  @Input('type') type: 'text'|'number'|'file' = 'text';
  @Input() control?: FormControl | undefined;
  @Input() isError: boolean = false;
  @Input() isDisabled: boolean = false;
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  theme$ = new Observable();
  constructor(private store: Store<State>) {
    this.theme$ = store.select('theme')
  }
}
