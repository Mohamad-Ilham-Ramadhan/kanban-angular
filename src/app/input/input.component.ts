import { Component, ElementRef, Input, ViewChild, AfterViewInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent implements AfterViewInit {
  @Input('type') type: 'text'|'number'|'file' = 'text';
  @Input() control?: FormControl | undefined;
  @Input() isError: boolean = false;
  @Input() isDisabled: boolean = false;

  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  ngAfterViewInit(): void {
    
  }
}
