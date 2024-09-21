import { Renderer2, Component, effect, ElementRef, viewChild, ViewChild, inject, Inject, Input, TemplateRef, ViewContainerRef, AfterViewInit} from '@angular/core';
import { DOCUMENT, NgClass} from '@angular/common';
import { OverlayModule, OverlayRef, Overlay } from '@angular/cdk/overlay';
import { TemplatePortal, PortalModule, Portal } from '@angular/cdk/portal';
import {MatMenuModule} from '@angular/material/menu';
import { trigger, state, style, animate, transition, AnimationEvent } from '@angular/animations';

@Component({
  selector: 'app-button-dropdown',
  standalone: true,
  imports: [NgClass, OverlayModule, PortalModule, MatMenuModule],
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
  dropdown = viewChild<ElementRef<HTMLDivElement>>('dropdown');
  @ViewChild('overlay') overlayTemplate!: TemplateRef<unknown>;
  @ViewChild('menu') menu!: ElementRef<HTMLDivElement>;
  show: boolean = false;
  @Input() position: 'center'|'left'|'right' = 'left';

  constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2) {
    this.window = document.defaultView;

    effect(() => {
      const $dropdown = this.dropdown()?.nativeElement;
      const rect = $dropdown?.getBoundingClientRect();
      const pad = 16; // padding from the screen when overflow the screen
      if (!rect || !$dropdown) return;
      // overflow right edge 
      if (rect && rect.right > this.window.innerWidth) {
        const px = rect.right - this.window.innerWidth + pad;
        renderer.setStyle($dropdown, 'transform', `translateX(-${px}px)`)
      }
    })
  }

  ngAfterViewInit(): void {
    // console.log('this.menu', this.menu)
  }

  menuOpened() {
    console.log('this.menu', this.menu)
  }

  toggleDropdown() {
    this.show = !this.show;
    setTimeout(() => {
      // console.log('dropdown', this.dropdown);
    })
  }
}
