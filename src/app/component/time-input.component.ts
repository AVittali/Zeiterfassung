import { Component, Directive, ElementRef, forwardRef, HostListener, inject, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NgControl, ControlContainer } from '@angular/forms';
import { MAT_INPUT_VALUE_ACCESSOR } from '@angular/material/input';
@Directive({
  selector: 'input[appTimeInput]',
  //selector: 'app-time-input',
  //templateUrl: 'time-input.component.html',
  // styleUrls: ['./time-input.component.scss'],
  providers: [
    {
      provide: MAT_INPUT_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimeInputDirective),
      // useExisting: TimeInputDirective,
      multi: true
    }
  ]

})
/*
@Directive({
  selector: 'input[appTimeInput]',
  providers: [
    { provide: MAT_INPUT_VALUE_ACCESSOR, useExisting: TimeInputDirective },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimeInputDirective),
      multi: true,
    }
  ]
})
*/

export class TimeInputDirective implements ControlValueAccessor {

  private readonly control?= inject(ControlContainer, { optional: true, self: true });
  // @Input() label!: string;
  value: string = "";
  disabled: boolean = false;
  onChange: any = () => { };
  onTouch: any = () => { };

  constructor(
    private readonly elementRef: ElementRef<HTMLInputElement>
  ) { }

  @HostListener('blur', ['$event'])
  onBlur(event: FocusEvent) {
    //this.onTouch;
    console.log({ "onBlur": event });
    //this.onChange("test")
  }

  /*
  @HostListener('input', ['$event.target.value'])
  onInput(value: any) {
    console.log({ onInput: value });
    // here we cut any non numerical symbols    
    this.value = value.replace(/[^\d.-]/g, '');
  }
  */

  writeValue(value: any) {

    console.log({ writeValueInput: value });
    // this.onChange("test")

    if (value !== undefined) {

      try {
        var numberValue = Number(value);
        if (numberValue > 0 && numberValue < 24) {
          this.value = numberValue + ":00";
        }
      } catch (error) {
        this.value = "";
      }
    }

    console.log({ writeValueOutput: this.value });

  }

  registerOnChange(fn: any) {
    console.log("registerOnChange");
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    console.log("registerOnTouched");
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean) {
    console.log("setDisabledState");
    this.disabled = isDisabled;
  }

}
