import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ButtonComponent } from '../button/button.component';
import { ButtonDropdownComponent } from '../button-dropdown/button-dropdown.component';
import { DialogDeleteBoardComponent } from '../dialog-delete-board/dialog-delete-board.component';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent, ButtonDropdownComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  dialog = inject(MatDialog);
  
  constructor(private store: Store) {
    // @ts-ignore
    this.theme$ = store.select('count')
  }
  theme$: Observable<string>;
  ngOnInit(): void {
    // console.log('store', this.store.state)
  }
  dialogRef!: MatDialogRef<DialogDeleteBoardComponent>;
  openDialogDeleteBoard() {
    this.dialogRef = this.dialog.open(DialogDeleteBoardComponent, {
      width: '480px'
    })
  };
  
}
