import { Component, forwardRef, Input, ViewChild, TemplateRef, ElementRef, viewChild, Inject, Renderer2, effect, Output, EventEmitter} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DOCUMENT, NgClass, AsyncPipe } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { Observable } from 'rxjs';
export interface Value {
  id: string;
  name: string;
}

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [OverlayModule, PortalModule, NgClass, AsyncPipe],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectComponent),
    multi: true
  }],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent implements ControlValueAccessor {

  private window: any;
  @ViewChild('overlay') overlayTemplate!: TemplateRef<unknown>;
  @ViewChild('menu') menu!: ElementRef<HTMLDivElement>;
  @Input() position: 'center'|'left'|'right' = 'left';
  @Input() columns: Value[] = [];
  @Input() currentColumn!: Value;
  @Input() currentColumnIndex: number = 0;
  @Output() onSelect = new EventEmitter();
  button = viewChild<ElementRef<HTMLButtonElement>>('button');
  dropdown = viewChild<ElementRef<HTMLDivElement>>('dropdown');
  show: boolean = false;
  open: boolean = false;
  selectedName: string;
  selectedIndex: number;
  theme$ = new Observable()

  constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2, private store: Store<State>) {
    this.theme$ = store.select('theme');
    this.window = document.defaultView;
    this.selectedName = this.columns.length > 0 ? this.columns[0].name : '';
    this.selectedIndex = 0;

    effect(() => {
      const $dropdown = this.dropdown()?.nativeElement;
      if ($dropdown) renderer.setStyle($dropdown, 'width', `${this.button()?.nativeElement.getBoundingClientRect().width}px`);
      const rect = $dropdown?.getBoundingClientRect();
      const pad = 16; // padding from the screen when overflow the screen
      if (!rect || !$dropdown) return;
      // overflow right edge 
      if (rect && rect.right > this.window.innerWidth) {
        const px = rect.right - this.window.innerWidth + pad;
        renderer.setStyle($dropdown, 'transform', `translateX(-${px}px)`)
      }
      // overflow bottom edge
      if (rect && rect.bottom > this.window.innerHeight) {
        console.log('overflow bottom');
        const px = rect.bottom - this.window.innerHeight + pad;
        renderer.setStyle($dropdown, 'transform', `translateY(-${px}px)`)
      }
    })
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.currentColumn) {
        this.selectedName = this.currentColumn.name;
        this.updateValue(this.currentColumnIndex);
      } else if (this.columns.length > 0) {
        this.selectedName = this.columns.length > 0 ? this.columns[0].name : '';
        this.updateValue(0);
      }
    })
  }

  menuOpened() {
    console.log('this.menu', this.menu)
  }

  toggleDropdown() {
    this.show = !this.show;
  }

  onChange: any = () => {};
  onTouch: any = () => {};
  
  writeValue(value: number): void {
    // this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // this.disabled = isDisabled;
  } 

  updateValue(index: number): void {
    console.log('updateValue() index', index)
    this.selectedIndex = index;
    this.onChange(index);
    this.onTouch();
  }

  selectOption(index: number, name: string) {
    console.log('select component selectOption ', index);
    this.selectedName = name;
    this.show = false;
    this.onSelect.emit({prevIndex: this.selectedIndex, newIndex: index});
    this.updateValue(index);
  }
}
