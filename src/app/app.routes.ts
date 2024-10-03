import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CobaComponent } from './coba/coba.component';
import { CobaCreateBoardComponent } from './coba-create-board/coba-create-board.component';

export const routes: Routes = [
   {path: '', component: AppComponent},
   {component: CobaComponent, path: 'coba'},
   {component: CobaCreateBoardComponent, path: 'coba-create'},
];
