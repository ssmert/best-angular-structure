import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormErrorMessageComponent } from './components/form-error-message.component';
import { FormFocusDirective } from './directives/form-focus.directive';
import { SortableDirective } from './directives/sortable.directive';
import { FooterComponent } from './layouts/footer/footer.component';
import { HeaderComponent } from './layouts/header/header.component';
import { MaskingPipe } from './pipes/masking.pipe';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    FormErrorMessageComponent,
    FormFocusDirective,
    SortableDirective,
    MaskingPipe
  ],
  imports: [CommonModule],
  exports: [
    FooterComponent,
    HeaderComponent,
    FormErrorMessageComponent,
    FormFocusDirective,
    SortableDirective,
    MaskingPipe],
})
export class SharedModule { }
