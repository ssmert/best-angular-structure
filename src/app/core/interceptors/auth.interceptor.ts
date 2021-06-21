import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { SessionStorageService } from '@core/services/session-storage.service';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private session: SessionStorageService,
    private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.setAuth(request)).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse) {
          if (403 === error.status) {
            if (!this.isRefreshing) {
              this.isRefreshing = true;
              this.refreshTokenSubject.next(null);

              return this.authService.refreshToken()
                .pipe(
                  switchMap(token => {
                    this.isRefreshing = false;
                    this.refreshTokenSubject.next(token);

                    // 토큰 갱신
                    this.session.setToken(token.accessToken, token.refreshToken);

                    return next.handle(this.setAuth(request));
                  }));
            }
            else {
              return this.refreshTokenSubject.pipe(
                filter(token => (token !== null && token !== undefined)),
                take(1),
                switchMap(() => {
                  return next.handle(this.setAuth(request));
                }));
            }
          }
          else {
            return throwError(error);
          }
        }
        else {
          return throwError(error);
        }
      }));
  }

  /**
   * 인증 정보를 추가한다.
   * 
   * @param req 요청 객체
   * @returns 요청 객체
   */
  private setAuth(req: HttpRequest<any>): HttpRequest<any> {
    // 무시할 URL
    const ignoreURLs = ['refreshToken', 'login'];
    // 마지막 URL
    const lastUrl = req.url.split('/')[req.url.split('/').length - 1];

    if (!ignoreURLs.includes(lastUrl)) {
      const accessToken = this.session.getToken();
      req = req.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } });
    }

    return req;
  }

}
