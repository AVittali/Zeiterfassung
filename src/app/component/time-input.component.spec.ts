import { AbstractControl } from "@angular/forms";
import { TimeInputDirective } from "./time-input.component";
import { ElementRef } from '@angular/core';

describe('TimeInputDirective', () => {

    it('Validate 800', () => {
        // var mockElement = { value: '800' } as unknown as ElementRef<HTMLInputElement>;
        var mockControl = { value: '800' } as unknown as AbstractControl<any, any>;
        const result = new TimeInputDirective(null as unknown as ElementRef<HTMLInputElement>).validate(mockControl);
        expect(result).toBe(null);
    });

    it('Validate 899', () => {
        // var mockElement = { value: '899' } as unknown as ElementRef<HTMLInputElement>;
        var mockControl = { value: '899' } as unknown as AbstractControl<any, any>;
        const result = new TimeInputDirective(null as unknown as ElementRef<HTMLInputElement>).validate(mockControl);
        expect(result).toEqual({ invalidMinuten: Object({ minuten: 99 }) });
    });

    it('Validate 2500', () => {
        // var mockElement = { value: '800' } as unknown as ElementRef<HTMLInputElement>;
        var mockControl = { value: '2500' } as unknown as AbstractControl<any, any>;
        const result = new TimeInputDirective(null as unknown as ElementRef<HTMLInputElement>).validate(mockControl);
        expect(result).toEqual({ invalidStunden: Object({ stunden: 25 }) });
    });

    it('Validate 0025', () => {
        var mockControl = { value: '0025' } as unknown as AbstractControl<any, any>;
        const result = new TimeInputDirective(null as unknown as ElementRef<HTMLInputElement>).validate(mockControl);
        expect(result).toBe(null);
    });

    // it('onInputChange 8', () => {
    //     var mockElement = null as unknown as ElementRef<HTMLInputElement>;
    //     var mockHTMLInputElement = { value: '8' } as unknown as HTMLInputElement;
    //     const directive = new TimeInputDirective(mockElement);
    //     directive['onInputChange'](mockHTMLInputElement);
    //     expect(directive['zeitValue']).toBe(800);
    // });

});


// import { Component, DebugElement } from '@angular/core';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { TimeInputDirective } from './time-input.component';

// @Component({
//     template: '<input type="text" [formControl]="control" myDirective>',
// })
// class TestComponent {

//     control = new FormControl();

// }

// describe('TimeInputDirective', () => {
//     let component: TestComponent;
//     let fixture: ComponentFixture<TestComponent>;
//     let inputEl: DebugElement;
//     let directiveInstance: TimeInputDirective;

//     // beforeEach(async () => {
//     //     await TestBed.configureTestingModule({
//     //         declarations: [TestComponent],
//     //         imports: [
//     //             TimeInputDirective
//     //         ],
//     //     }).compileComponents();
//     // });

//     // beforeEach(() => {
//     //     fixture = TestBed.createComponent(TestComponent);
//     //     component = fixture.componentInstance;
//     //     fixture.detectChanges();
//     // });

//     beforeEach(async () => {
//         await TestBed.configureTestingModule({
//             imports: [FormsModule, ReactiveFormsModule, TimeInputDirective],
//             declarations: [TestComponent]
//         }).compileComponents();
//     });

//     beforeEach(() => {
//         fixture = TestBed.createComponent(TestComponent);
//         component = fixture.componentInstance;
//         fixture.detectChanges();
//         inputEl = fixture.debugElement.query(By.css('input'));
//         directiveInstance = inputEl.injector.get(TimeInputDirective);
//     });

//     it('should create the directive', () => {
//         const directive = fixture.debugElement.nativeElement.querySelector('[myDirective]');
//         expect(directive).toBeDefined();
//     });

//     it('ValidateError', () => {
//         const control = component.control;
//         control.setValue('999');
//         const validationErrors = directiveInstance.validate(control);
//         expect(validationErrors).toEqual({ myDirective: true });
//     });

//     it('ValidateTrue', () => {
//         const control = component.control;
//         control.setValue('800');
//         const validationErrors = directiveInstance.validate(control);
//         expect(validationErrors).toEqual({ myDirective: true });
//     });

// });