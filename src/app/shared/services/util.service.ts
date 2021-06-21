import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RouteType } from '@shared/enums/route-type';

@Injectable({ providedIn: 'root' })
export class UtilService {

  /**
   * @param router 라우터
   */
  constructor(private router: Router) { }

  /**
   * 경로에 해당하는 화면으로 이동한다.
   *
   * @param routePath 화면경로
   * @param routeType 화면이동 유형
   */
  route(routePath: string, routeType?: RouteType): void {
    this.router.navigate([routePath], { queryParams: { routeType } });
  }

  /**
   * 문자열 날짜(YYYYMMDD)를 YYYY{구분자}MM{구분자}DD로 변환한다.
   * 
   * @param date 날짜
   * @param delimiter 구분자
   */
  toFormatString(date: string, delimiter: string): string {
    let fDate = date;
    if (date.length === 8) {
      fDate = date.replace(/(\d{4})(\d{2})(\d{2})/, `$1${delimiter}$2${delimiter}$3`);
    }

    return fDate;
  }

  /**
   * Date를 YYYYMMDD 문자로 변환한다.
   * 
   * @param date 날짜
   */
  toYmdString(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
    const day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;

    return `${year}${month}${day}`;
  }

  /**
   * Date를 YYYYMMDDSS 문자로 변환한다.
   * 
   * @param date 날짜
   */
  toYmsDateString(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
    const day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
    const hour = date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
    const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
    const sec = date.getSeconds() < 10 ? `0${date.getSeconds()}` : `${date.getSeconds()}`;

    return `${year}${month}${day}${hour}${minute}${sec}`;
  }

  /**
   * Date를 YYYYMMDDSSMS 문자로 변환한다.
   * 
   * @param date 날짜
   */
  toYmmsDateString(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
    const day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
    const hour = date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
    const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
    const sec = date.getSeconds() < 10 ? `0${date.getSeconds()}` : `${date.getSeconds()}`;
    const ms = date.getMilliseconds() < 10 ? `0${date.getMilliseconds()}` : `${date.getMilliseconds()}`;

    return `${year}${month}${day}${hour}${minute}${sec}${ms}`;
  }

  /**
   * 핸드폰 번호를 변환한다.
   * 
   * @param date 날짜
   */
  toDashPhone(phone: string): string {
    let fPhone = phone;

    if (phone.length === 11) {
      fPhone = fPhone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    }
    else if (phone.length === 10) {
      fPhone = fPhone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    }

    return fPhone;
  }


  /**
   * 오브젝트 매퍼이다.
   * 
   * @param target 대상
   * @param offer 제공
   */
  objectMapper(target: any, offer: any): void {
    for (const key in offer) {
      if (target.hasOwnProperty(key)) {
        target[key] = offer[key];
      }
    }
  }

  /**
   * 오브젝트의 공백 제거자이다.
   * 
   * @param target 대상 모델
   */
  objectCleaner(target: any): void {
    // tslint:disable-next-line: forin
    for (const key in target) {
      if (typeof target[key] === 'string' && target[key].trim() === '') {
        delete target[key];
      }
      else if (target[key] === null || target[key] === undefined) {
        delete target[key];
      }
      else if (Array.isArray(target[key])) {
        if (target[key].length === 0) {
          delete target[key];
        }
      }
    }
  }

}
