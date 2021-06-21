import { HttpClient, HttpHandler, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigurationService } from './configuration.service';

@Injectable({ providedIn: 'root' })
export class RestService {
  // 서버 접속주소
  private readonly API_URL: string;
  // HTTP 객체
  private readonly http: HttpClient;

  /**
   * @param handler HTTP 핸들러
   * @param config 설정 서비스
   */
  constructor(
    private handler: HttpHandler,
    private config: ConfigurationService) {
    this.http = new HttpClient(this.handler);
    this.API_URL = this.config.getEndpoint();
  }

  /**
   * GET 거래 함수이다.
   * 
   * @param url 주소
   * @param params 파라메터
   * @returns 
   */
  get(url: string, params?: HttpParams): Observable<any> {
    return new Observable<any>(observer =>
      this.internalGet(url, { params })
        .subscribe(
          response => { observer.next(response.body); },
          error => { observer.error(this.handleError(error)); }
        )
    );
  }

  /**
   * GET 파일 거래 함수이다.
   * 
   * @param url 주소
   * @param params 파라메터
   * @returns 
   */
  getFile(url: string, params?: HttpParams): Observable<any> {
    return new Observable<any>(observer =>
      this.internalGetFile(url, { params })
        .subscribe(
          response => { observer.next(response); },
          error => { observer.error(this.handleError(error)); }
        )
    );
  }

  /**
   * POST 거래 함수이다.
   * 
   * @param url 주소
   * @param data 데이터
   * @param params 파라메터
   * @returns HTTP 응답
   */
  create(url: string, data?: any, params?: HttpParams): Observable<any> {
    return new Observable<any>(observer =>
      this.internalPost(url, { body: data, params })
        .subscribe(
          response => { observer.next(response.body); },
          error => { observer.error(this.handleError(error)); }
        )
    );
  }

  /**
   * PUT 거래 함수이다.
   * 
   * @param url 주소
   * @param data 데이터
   * @param params 파라메터
   * @returns HTTP 응답
   */
  update(url: string, data?: any, params?: HttpParams): Observable<any> {
    return new Observable<any>(observer =>
      this.internalPut(url, { body: data, params })
        .subscribe(
          response => { observer.next(response.body); },
          error => { observer.error(this.handleError(error)); }
        )
    );
  }

  /**
   * DELETE 거래 함수이다.
   * 
   * @param url 주소
   * @param params 파라메터
   * @returns HTTP 응답
   */
  delete(url: string, params?: HttpParams): Observable<any> {
    return new Observable<any>(observer =>
      this.internalDelete(url, { params })
        .subscribe(
          response => { observer.next(response.body); },
          error => { observer.error(this.handleError(error)); }
        )
    );
  }

  /**
   * GET 거래를 감싼 내부 함수이다.
   *
   * @param url 주소
   * @param options 옵션
   * @returns HTTP 응답(JSON)
   */
  private internalGet<R>(url: string, options?: any): Observable<HttpResponse<R>> {
    return this.http.get<R>(`${this.API_URL}/${url}`,
      {
        observe: 'response',
        params: options.params,
        responseType: 'json',
        withCredentials: false
      });
  }

  /**
   * GET 파일 거래를 감싼 내부 함수이다.
   *
   * @param url 주소
   * @param options 옵션
   * @returns HTTP 응답(Blob)
   */
  private internalGetFile(url: string, options?: any): Observable<HttpResponse<Blob>> {
    return this.http.get(`${this.API_URL}/${url}`,
      {
        observe: 'response',
        params: options.params,
        reportProgress: true,
        responseType: 'blob',
        withCredentials: false
      });
  }

  /**
   * POST 거래를 감싼 내부 함수이다.
   * 
   * @param url 주소
   * @param options 옵션
   * @returns HTTP 응답(JSON)
   */
  private internalPost<R>(url: string, options?: any): Observable<HttpResponse<R>> {
    return this.http.post<R>(`${this.API_URL}/${url}`, options.body,
      {
        observe: 'response',
        params: options.params,
        reportProgress: true,
        responseType: 'json',
        withCredentials: false
      });
  }

  /**
   * PUT 거래를 감싼 내부 함수이다.
   *
   * @param url 주소
   * @param options 옵션
   * @returns HTTP 응답
   */
  private internalPut<R>(url: string, options?: any): Observable<HttpResponse<R>> {
    return this.http.put<R>(`${this.API_URL}/${url}`, options.body,
      {
        observe: 'response',
        params: options.params,
        responseType: 'json',
        withCredentials: false
      });
  }

  /**
   * DELETE 거래를 감싼 내부 함수이다.
   *
   * @param url 주소
   * @param options 옵션
   * @returns HTTP 응답
   */
  private internalDelete<R>(url: string, options?: any): Observable<HttpResponse<R>> {
    return this.http.delete<R>(`${this.API_URL}/${url}`,
      {
        observe: 'response',
        params: options.params,
        responseType: 'json',
        withCredentials: false
      });
  }

  /**
   * 에러처리 기본 핸들러 이다.
   *
   * @param error 에러
   */
  private handleError(error: any): any {
    let errorBody: any = {};
    let errResponse: any;

    if (0 === error.status) {
      errResponse = {
        status: error.status,
        error: error.message || error,
        message: '서버로부터 응답이 없습니다. 관리자에게 문의하여 주시기 바랍니다.'
      };
    } else {
      errResponse = error.error;
      errorBody = error.error || {};
      errResponse = {
        status: error.status,
        error: error.error,
        message: errorBody.message ? errorBody.message.replace('<br>', '\n') : error.message ? error.message.replace('<br>', '\n') : `${error.statusText}(${error.status})`
      };
    }

    return errResponse;
  }
}
