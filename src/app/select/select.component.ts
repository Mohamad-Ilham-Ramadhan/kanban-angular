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
  @Output() onSelect = new EventEmitter();
  button = viewChild<ElementRef<HTMLButtonElement>>('button');
  dropdown = viewChild<ElementRef<HTMLDivElement>>('dropdown');
  show: boolean = false;
  open: boolean = false;
  selectedName: string;
  selectedId: string;
  theme$ = new Observable()

  constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2, private store: Store<State>) {
    console.log('this.currentColumn', this.currentColumn);
    this.theme$ = store.select('theme');
    this.window = document.defaultView;
    this.selectedName = this.columns.length > 0 ? this.columns[0].name : '';
    this.selectedId = this.columns.length > 0 ? this.columns[0].id : '';

    console.log('this.columnIndex')

    effect(() => {
      console.log('select effect()');
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
        this.updateValue(this.currentColumn.id);
      } else if (this.columns.length > 0) {
        this.selectedName = this.columns.length > 0 ? this.columns[0].name : '';
        this.updateValue(this.columns.length > 0 ? this.columns[0].id : '');
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

  updateValue(id: string): void {
    console.log('updateValue() id', id)
    this.selectedId = id;
    this.onChange(id);
    this.onTouch();
  }

  selectOption(id: string, name: string) {
    console.log('select component selectOption ', id);
    this.selectedName = name;
    this.show = false;
    this.onSelect.emit({prevId: this.selectedId, newId: id});
    this.updateValue(id);
  }
}
