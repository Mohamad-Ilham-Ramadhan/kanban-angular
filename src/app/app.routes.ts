import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CobaComponent } from './coba/coba.component';

export const routes: Routes = [
   {component: AppComponent, path: ''},
   {component: CobaComponent, path: 'coba'},
];
