import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({ selector: '[formFocus]' })
export class FormFocusDirective {
    constructor(private el: ElementRef) { }

    @HostListener('submit')
    onSubmit(): void {
        // 유효하지않은 컨트롤
        const invalidControl = this.el.nativeElement.querySelector('.ng-invalid');

        if (invalidControl) {
            // 포커스 처리
            invalidControl.focus();
            // 스크롤 처리
            invalidControl.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        }
    }
}
