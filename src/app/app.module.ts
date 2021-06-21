import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { COMPOSITION_BUFFER_MODE, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AuthInterceptor } from '@core/interceptors/auth.interceptor';
import { ScreenBlockInterceptor } from '@core/interceptors/screen-block.interceptor';
import { BoardModule } from '@modules/board/board.module';
import { LoginComponent } from '@modules/common/pages/login/login.component';
import { MainComponent } from '@modules/common/pages/main/main.component';
import { UserModule } from '@modules/user/user.module';
import { BaseLayoutComponent } from '@shared/layouts/base-layout/base-layout.component';
import { PageLayoutComponent } from '@shared/layouts/page-layout/page-layout.component';
import { SharedModule } from '@shared/shared.module';
import { BlockUIModule } from 'ng-block-ui';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    PageLayoutComponent,
    BaseLayoutComponent,
    LoginComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BlockUIModule.forRoot(),
    // 사용자 모듈
    SharedModule,
    BoardModule,
    UserModule
  ],
  providers: [
    // 한글 즉시인식
    { provide: COMPOSITION_BUFFER_MODE, useValue: false },
    // http 인터셉터
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ScreenBlockInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
