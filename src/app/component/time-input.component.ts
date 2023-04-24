import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, Directive, ElementRef, forwardRef, HostBinding, HostListener, Inject, inject, Input, OnDestroy, Optional, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, ControlContainer, NG_VALUE_ACCESSOR, AbstractControlDirective, NgControl, Validators, AbstractControl, FormBuilder, ValidatorFn, ValidationErrors, Validator, NG_VALIDATORS } from '@angular/forms';
import { MatFormField, MatFormFieldControl, MAT_FORM_FIELD } from '@angular/material/form-field';
import { MAT_INPUT_VALUE_ACCESSOR } from '@angular/material/input';
import { format } from 'date-fns';
import { Observable, Subject } from 'rxjs';
import { TimeFunctions } from '../api/time-functions';

@Directive({
  selector: 'input[appTimeInput]',
  standalone: true,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: TimeInputDirective, multi: true },
    { provide: NG_VALIDATORS, useExisting: TimeInputDirective, multi: true }
  ]
})

export class TimeInputDirective implements ControlValueAccessor, Validator {
  private onChange?: (value: any) => void;
  private onTouched?: () => void;

  @HostBinding('attr.disabled')
  protected disabled?: boolean;

  private zeitValue: number = 0;

  constructor(private readonly elementRef: ElementRef<HTMLInputElement>) { }

  @HostListener('blur', ['$event.target'])
  protected onInputChange(target: HTMLInputElement) {
    console.log({ "onBlur": target.value });

    // Der durch die Aufbereitung vorhandene Doppelpunkt ggf. entfernen
    var inputValue = target.value.replace(':', '');
    if (inputValue == null) {
      return;
    }

    // console.log({ "inputValue": inputValue });
    if (inputValue == "") {
      this.setInputViewDateValue("");
      return;
    }

    // Wenn eine zweistellige Zahl eingegeben wurde, müssen die Minuten ergänzt werden,
    // so dass es sich um eine volle Stunden handelt.
    if (inputValue.length < 3) {
      inputValue = inputValue + "00";
    }

    var numberValue: number = Number.parseInt(inputValue);
    console.log({ "blur: numberValue": numberValue });

    var stunden = Math.floor(numberValue / 100);
    var minuten = numberValue % 100;
    var outputValue = this.formatNumber(stunden) + ":" + this.formatNumber(minuten);
    // console.log({ outputValue: outputValue });
    this.zeitValue = numberValue;
    console.log({ zeitValue: this.zeitValue });

    if (this.isStundenValid(stunden) && this.isMinutenValid(minuten)) {
      this.setInputViewDateValue(outputValue);
      this.onChange?.(numberValue);
      // this.setInputViewDateValue(numberValue);
      // this.writeValue(outputValue);
      // this.writeValue(numberValue);
    }
  }

  @HostListener('input', ['$event.target'])
  public onInput(target: HTMLInputElement) {
    // console.log({ onInput: target.value });

    // Alle Zeichen außer Zahlen entfernen
    // var newValue = target.value.replace(/[^0-9:]/g, ''); // Früher war Doppelpunkt auch erlaubt
    var newValue = target.value.replace(/[^0-9]/g, '');
    // console.log(({replace:replValue}));

    // Maximallänge 4 Zeichen erlaubt
    newValue = newValue.substring(0, 4);

    // console.log(({ newValue: newValue }));

    this.onChange?.(newValue);
    this.onTouched?.();
    this.setInputViewDateValue(newValue);
    // this.writeValue(newValue);
  }

  public writeValue(value: any) {
    console.log("writeValue");
    if (value == 0) {
      this.setInputViewDateValue("");
    } else {
      this.setInputViewDateValue(TimeFunctions.formatZeit(value));
    }

  }

  public registerOnChange(fn: any): void {
    // console.log("registerOnChange");
    this.onChange = fn;
  }

  public registerOnTouched(onTouched: any) {
    // console.log("registerOnTouched");
    this.onTouched = onTouched;
  }

  public setDisabledState(isDisabled: boolean) {
    // console.log("setDisabledState");
    this.disabled = isDisabled ? isDisabled : undefined;
  }

  private setInputViewDateValue(inputValue: any) {
    console.log({ setInputViewDateValue: inputValue });

    this.elementRef.nativeElement.value = inputValue;
    console.log({ nativeElement: this.elementRef.nativeElement.value });

  }

  private formatNumber(number: number): String {
    if (number < 10) {
      return "0" + number;
    }

    return number + "";
  }

  public validate(control: AbstractControl): ValidationErrors | null {
    console.log({ validate: control?.value });
    // console.log({ type: typeof (control?.value) });

    var stringValue: string = control?.value;
    // console.log({ stringValue: stringValue });

    var numberValue: number = Number.parseInt(stringValue);
    var stunden: number = 0;

    // Reine Stundenangabe: Besonderheit führende Nullen für 0:xx Uhr

    console.log({ stringValueLength: stringValue.length });
    // TODO Muss der Block noch so sein?
    if (numberValue < 100 && stringValue.length < 3) {
      // Angabe von vollen Stunden --> Wert muss * 100 genommen werden
      numberValue = numberValue * 100;
      stunden = TimeFunctions.getStunden(numberValue);
    } else if (numberValue < 100) {
      // 0:xx Uhr 
      stunden = 0;
    } else {
      // Stunden ermitteln
      stunden = TimeFunctions.getStunden(numberValue);
    }

    const minuten = TimeFunctions.getMinuten(numberValue);
    // console.log({ minuten: minuten });

    if (!this.isStundenValid(stunden)) {
      return { invalidStunden: { 'stunden': stunden } }
    }

    if (!this.isMinutenValid(minuten)) {
      return { invalidMinuten: { 'minuten': minuten } }
    }

    return null;

  }

  private isStundenValid(stunden: number): boolean {
    return stunden < 24;
  }

  private isMinutenValid(minuten: number): boolean {
    return minuten < 60;
  }

}

// function customValidator(minLength: number): ValidatorFn {
//   return (control: AbstractControl): ValidationErrors | null => {
//     const value = control.value;
//     if (!value || value.length < minLength) {
//       return { 'minlength': { 'requiredLength': minLength, 'actualLength': value ? value.length : 0 } };
//     }
//     return null;
//   };
// }


/*
// Versuch von: https://material.angular.io/guide/creating-a-custom-form-field-control
@Component({
  selector: 'input[appTimeInput]',
  templateUrl: 'time-input.component.html',
  standalone: true,
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: TimeInputDirective,
      multi: true
    }
  ]
})

export class TimeInputDirective implements ControlValueAccessor, MatFormFieldControl<String>, OnDestroy {

  static nextId = 0;
  // TODO
  // @ViewChild('area') areaInput: HTMLInputElement;
  @ViewChild('area') areaInput: HTMLInputElement = new HTMLInputElement();

  parts = this._formBuilder.group({
    area: ['', [Validators.required]],
  });
  stateChanges = new Subject<void>();
  focused = false;
  touched = false;
  controlType = 'example-tel-input';
  id = `example-tel-input-${TimeInputDirective.nextId++}`;
  onChange = (_: any) => { };
  onTouched = () => { };

  get empty() {
    const {
      value: { area },
    } = this.parts;

    return !area;
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @Input('aria-describedby') userAriaDescribedBy: string = "";

  @Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  private _placeholder: string = "";

  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: BooleanInput) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this.parts.disable() : this.parts.enable();
    this.stateChanges.next();
  }
  private _disabled = false;

  @Input()
  get value(): String | null {
    if (this.parts.valid) {
      const {
        value: {area},
      } = this.parts;
      return "";
    }
    return null;
  }
  set value(tel: String | null) {
    // TODO Der Scheiß compiliert nicht
    // Original
    // const {area, exchange, subscriber} = tel || new MyTel('', '', '');
    // this.parts.setValue({area, exchange, subscriber});
    // 1. Versuch
    // const {area} = tel || ""; // Die Eigenschaft "area" ist für den Typ "String | """ nicht vorhanden.ts(2339)
    // this.parts.setValue({area});
    // 2. Versuch
    // this.parts.setValue(tel);
    this.stateChanges.next();
  }

  get errorState(): boolean {
    return this.parts.invalid && this.touched;
  }

  constructor(
    private _formBuilder: FormBuilder,
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Inject(MAT_FORM_FIELD) public _formField: MatFormField,
    @Optional() @Self() public ngControl: NgControl,
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  onFocusIn(event: FocusEvent) {
    if (!this.focused) {
      this.focused = true;
      this.stateChanges.next();
    }
  }

  onFocusOut(event: FocusEvent) {
    if (!this._elementRef.nativeElement.contains(event.relatedTarget as Element)) {
      this.touched = true;
      this.focused = false;
      this.onTouched();
      this.stateChanges.next();
    }
  }

  autoFocusNext(control: AbstractControl, nextElement?: HTMLInputElement): void {
    if (!control.errors && nextElement) {
      this._focusMonitor.focusVia(nextElement, 'program');
    }
  }

  autoFocusPrev(control: AbstractControl, prevElement: HTMLInputElement): void {
    if (control.value.length < 1) {
      this._focusMonitor.focusVia(prevElement, 'program');
    }
  }

  setDescribedByIds(ids: string[]) {
    const controlElement = this._elementRef.nativeElement.querySelector(
      '.example-tel-input-container',
    )!;
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }

  onContainerClick() {
    this._focusMonitor.focusVia(this.areaInput, 'program');
  }

  writeValue(tel: String | null): void {
    this.value = tel;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  _handleInput(control: AbstractControl, nextElement?: HTMLInputElement): void {
    this.autoFocusNext(control, nextElement);
    this.onChange(this.value);
  }

}
*/