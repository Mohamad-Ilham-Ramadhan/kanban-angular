import { Component, OnDestroy, AfterViewInit, ViewChild, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import {create} from '../actions/board.action';
import { BoardState } from '../reducers/board.reducer';

@Component({
  selector: 'app-coba-create-board',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, AsyncPipe, MatSlideToggleModule, RouterLink],
  templateUrl: './coba-create-board.component.html',
  styleUrl: './coba-create-board.component.scss'
})
export class CobaCreateBoardComponent {
  @ViewChild('input1') input1!: ElementRef;
  @ViewChild('input2') input2!: ElementRef;

  @ViewChildren('task') tasks!: QueryList<ElementRef>;

  check() {
    console.log('this.input1.nativeElement', this.input1.nativeElement)
    console.log('this.input2.nativeElement', this.input2.nativeElement)
    this.tasks.forEach( t => {
      console.log('t', t)
    })
    console.log("this.tasks.get(0)?.nativeElement.dataset['destination-y']", this.tasks.get(0)?.nativeElement.dataset['destinationY'])
  }
}
