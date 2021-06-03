import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormErrorMessageComponent } from './components/form-error-message.component';
import { FormFocusDirective } from './directives/form-focus.directive';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { MaskingPipe } from './pipes/masking.pipe';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    FormErrorMessageComponent,
    FormFocusDirective,
    MaskingPipe
  ],
  imports: [CommonModule],
  exports: [
    FooterComponent,
    HeaderComponent,
    FormErrorMessageComponent,
    FormFocusDirective,
    MaskingPipe],
})
export class SharedModule { }
