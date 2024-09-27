import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  standalone: true,
  imports: [],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CustomInputComponent),
    multi: true
  }],
  templateUrl: './custom-input.component.html',
  styleUrl: './custom-input.component.scss'
})
export class CustomInputComponent implements ControlValueAccessor {
  // input: string = '';
  // writeValue(input: string) {
  //   this.input = input;
  // }

  // // Step 3: Copy paste this stuff here into your class
  // onChange: any = () => {}
  // onTouch: any = () => {}
  // registerOnChange(fn: any): void {
  //   this.onChange = fn;
  // }
  // registerOnTouched(fn: any): void {
  //   this.onTouch = fn;
  // }

  // ======================================================== 

  @Input() min: number = 0;
  @Input() max: number = 100;
  value: number = 0;
  disabled: boolean = false;

  onChange: any = () => {};
  onTouch: any = () => {};

  writeValue(value: number): void {
    console.log('writeValue', value);
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  xxx: string = 'bukan';
  
  updateValue(event: Event): void {
    console.log('updateValue');
    const newValue = (event.target as HTMLInputElement).valueAsNumber;
    if (newValue === 50) { this.xxx = 'ilma puluh buyung puyuh';}
    // this.xxx = 'ilma puluh buyung puyuh';
    this.value = newValue;
    this.onChange(newValue);
    this.onTouch();
  }


}
