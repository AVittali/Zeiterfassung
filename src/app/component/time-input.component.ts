import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-time-input',
  templateUrl: 'time-input.component.html',
  // styleUrls: ['./time-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimeInputComponent),
      multi: true
    }
  ]
})

export class TimeInputComponent implements ControlValueAccessor {
  @Input() label!: string;
  value: string = "";
  disabled: boolean = false;
  onChange: any = () => { };
  onTouch: any = () => { };
  

  writeValue(value: any) {

    console.log({ writeValueInput: value });

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

  /*
  validate() {
    console.log("validate");
    
    this.onChange(this.value);
  }
  */

}
