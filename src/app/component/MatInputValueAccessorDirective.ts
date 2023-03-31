import { Directive } from '@angular/core';
import { DefaultValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MAT_INPUT_VALUE_ACCESSOR } from '@angular/material/input';

@Directive({
  selector: 'input[matInput]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MatInputValueAccessorDirective,
      multi: true
    }
  ]
})
export class MatInputValueAccessorDirective extends DefaultValueAccessor {}
