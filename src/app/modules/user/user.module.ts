import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './pages/user-register.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [
    UserComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  exports: [
    UserComponent
  ]
})
export class UserModule { }
