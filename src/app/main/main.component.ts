import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  @ViewChild('aside') asideEl!: ElementRef;
  @ViewChild('main') mainEl!: ElementRef;

  toggleSidebar() {
    console.log('this.asideEl', this.asideEl.nativeElement);
    // this.asideEl.nativeElement.classList.toggle('hide');
    this.mainEl.nativeElement.classList.toggle('hide');
  }
}
