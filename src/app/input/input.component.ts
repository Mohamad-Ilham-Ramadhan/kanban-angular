import { Component, ElementRef, Input, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent implements AfterViewInit {
  @Input('type') type: 'text'|'number'|'file' = 'text';
  @Input() control?: FormControl | undefined;
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  ngAfterViewInit(): void {
    
  }
}
