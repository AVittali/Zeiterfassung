import { Directive, ElementRef, forwardRef, HostListener, inject, Input } from '@angular/core';
import { ControlValueAccessor, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MAT_INPUT_VALUE_ACCESSOR } from '@angular/material/input';
@Directive({
  selector: 'input[appTimeInput]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimeInputDirective),
      multi: true
    }
  ]

})

export class TimeInputDirective implements ControlValueAccessor {

  private readonly control?= inject(ControlContainer, { optional: true, self: true });

  value: string = "";
  disabled: boolean = false;
  onChange: any = () => { };
  onTouch: any = () => { };

  constructor(
    private readonly elementRef: ElementRef<HTMLInputElement>
  ) { }

  @HostListener('blur', ['$event'])
  onBlur(event: FocusEvent) {
    console.log({ "onBlur": event });
  }

  @HostListener('input', ['$event.target.value'])
  onInput(value: any) {
    console.log({ onInput: value });
    // here we cut any non numerical symbols    
    // this.value = value.replace(/[^\d.-]/g, '');
  }

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
