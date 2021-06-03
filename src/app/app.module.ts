import { NgModule } from '@angular/core';
import { COMPOSITION_BUFFER_MODE, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HomeModule } from '@modules/home/home.module';
import { UserModule } from '@modules/user/user.module';
import { BaseComponent } from '@shared/layout/base/base.component';
import { SharedModule } from '@shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpHandler } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // 사용자 모듈
    SharedModule,
    HomeModule,
    UserModule
  ],
  providers: [
    {
      // 한글 즉시인식
      provide: COMPOSITION_BUFFER_MODE,
      useValue: false
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
