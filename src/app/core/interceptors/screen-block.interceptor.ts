import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable()
export class ScreenBlockInterceptor implements HttpInterceptor {
  @BlockUI() block: NgBlockUI;

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 화면잠금을 시작한다.
    this.block.start();
    return next.handle(request).pipe(
      finalize(() => {
        // 화면잠금을 해제한다.
        this.block.stop();
      }));
  }
}
