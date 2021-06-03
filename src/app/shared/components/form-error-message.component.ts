import { Component } from '@angular/core';
@Component({
    selector: 'error-message',
    template: `<span *ngIf="errorMessage !== null">{{errorMessage}}</span>`
})
export class FormErrorMessageComponent {
    constructor() { }

    /**
     * 오류 메시지를 반환한다.
     */
    get errorMessage(): any {
        return null;
    }
}
