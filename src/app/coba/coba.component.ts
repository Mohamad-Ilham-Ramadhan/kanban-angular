import { Component } from '@angular/core';
import { animate, trigger, transition, style, state, AnimationEvent } from '@angular/animations';
import { NgIf } from '@angular/common';

import { MainComponent } from '../main/main.component';
import { HeaderComponent } from '../header/header.component';
@Component({
  selector: 'app-coba',
  standalone: true,
  imports: [NgIf, HeaderComponent, MainComponent],
  templateUrl: './coba.component.html',
  styleUrl: './coba.component.scss',
  animations: [
    trigger('openClose', [
      state('open', style({
        opacity: 1,
        backgroundColor: 'yellow',
      })),
      state('closed', style({
        opacity: 0,
        backgroundColor: 'red',
        visibility: 'hidden'
      })),
      transition('closed => open', [animate('300ms')]),
      transition('open => closed', [animate('300ms')]),
    ])
  ],
})
export class CobaComponent {
  show: boolean = false;
}
