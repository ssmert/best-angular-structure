import { Component, Input, Self } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ValidationService } from '@shared/services/validation.service';
@Component({
    selector: 'error-message',
    template: `<span *ngIf="errorMessage !== null && (control.dirty || show)">{{errorMessage}}</span>`
})
export class FormErrorMessageComponent {
    // 오류 메시지
    msg: string;
    // 폼 컨트롤
    @Input() control: FormControl;
    @Input() form: FormGroup;
    @Input() show: boolean;

    constructor() { }

    /**
     * 오류 메시지를 반환한다.
     */
    get errorMessage(): any {
        this.msg = null;
        if (undefined !== this.form) {
            for (const propertyName in this.form.errors) {
                if (this.form.errors.hasOwnProperty(propertyName)) {
                    this.msg = ValidationService.getErrorMessage(propertyName, this.form.errors[propertyName]);
                }
            }
        }
        if (undefined !== this.control) {
            for (const propertyName in this.control.errors) {
                if (this.control.errors.hasOwnProperty(propertyName)) {
                    this.msg = ValidationService.getErrorMessage(propertyName, this.control.errors[propertyName]);
                }
            }
        }

        return this.msg;
    }
}
