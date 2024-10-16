import { Renderer2, Component, effect, ElementRef, viewChild, ViewChild, inject, Inject, Input, TemplateRef, ViewContainerRef, AfterViewInit} from '@angular/core';
import { DOCUMENT, NgClass, AsyncPipe} from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import {MatMenuModule} from '@angular/material/menu';
import { trigger, style, animate, transition } from '@angular/animations';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-button-dropdown',
  standalone: true,
  imports: [NgClass, OverlayModule, PortalModule, MatMenuModule, AsyncPipe],
  templateUrl: './button-dropdown.component.html',
  styleUrl: './button-dropdown.component.scss',
  animations: [
    trigger('openClose', [
      transition(":enter", [
        style({ opacity: 0, }), //apply default styles before animation starts
        animate(
          "200ms ease",
          style({ opacity: 1, })
        )
      ]),
      transition(":leave", [
        style({ opacity: 1, }), //apply default styles before animation starts
        animate(
          "200ms ease",
          style({ opacity: 0, })
        )
      ])
    ])
  ],
})
export class ButtonDropdownComponent implements AfterViewInit {
  private window: any;
  @ViewChild('overlay') overlayTemplate!: TemplateRef<unknown>;
  @ViewChild('menu') menu!: ElementRef<HTMLDivElement>;
  @Input() position: 'center'|'left'|'right' = 'left';
  dropdown = viewChild<ElementRef<HTMLDivElement>>('dropdown');
  show: boolean = false;
  theme$ = new Observable();
  constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2, private store: Store<State>) {
    this.window = document.defaultView;
    this.theme$ = store.select('theme');
    effect(() => {
      const $dropdown = this.dropdown()?.nativeElement;
      const rect = $dropdown?.getBoundingClientRect();
      const pad = 16; // padding from the screen when overflow the screen
      if (!rect || !$dropdown) return;
      // overflow right edge 
      // console.log('rect', rect, 'this.window.innerWidth', this.window.innerWidth);
      if (rect && rect.right > this.window.innerWidth) {
        // console.log('overflow right edge');
        const matrix = new DOMMatrix(window.getComputedStyle($dropdown).transform)
        // console.log('matrix', matrix);
        const px = rect.right - this.window.innerWidth + pad;
        // console.log('px', px, matrix.e - px);
        renderer.setStyle($dropdown, 'transform', `translateX(${matrix.e - px}px)`)
      }
    })
  }

  ngAfterViewInit(): void {
  }

  menuOpened() {
    console.log('this.menu', this.menu)
  }

  toggleDropdown() {
    this.show = !this.show;
  }
}
