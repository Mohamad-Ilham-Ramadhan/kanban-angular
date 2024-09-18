import { ChangeDetectionStrategy, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { DialogCreateNewBoardComponent } from '../dialog-create-new-board/dialog-create-new-board.component';
import { State } from '../reducers';

import { InputComponent } from '../input/input.component';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms'
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterLink, CommonModule, AsyncPipe, InputComponent, FormsModule, ReactiveFormsModule],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  @ViewChild('aside') asideEl!: ElementRef;
  @ViewChild('main') mainEl!: ElementRef;

  form = new FormGroup({
    suka: new FormControl('')
  });

  boards$ = new Observable<any>();
  board$ = new Observable();
  // 'asdf'
  constructor(private store: Store<State>) {
    this.boards$ = store.select('board')
    this.boards$.subscribe( val => {
    })
  }

  toggleSidebar() {
    console.log('this.asideEl', this.asideEl.nativeElement);
    // this.asideEl.nativeElement.classList.toggle('hide');
    this.mainEl.nativeElement.classList.toggle('hide');
  }

  dialog = inject(MatDialog);
  openDialog() {
    const dialogRef = this.dialog.open(DialogCreateNewBoardComponent, {
      width: '480px'
    })
  }
}
