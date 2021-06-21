import { Injectable } from '@angular/core';
import { RestService } from '@core/services/rest.service';
import { Observable } from 'rxjs';
import { SessionStorageService } from './session-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private uri: string = 'auth';

  // ! ************************************** 초기화 메서드 ***************************************

  constructor(
    private restService: RestService,
    private session: SessionStorageService) { }

  // ! ************************************** 서버 거래 메서드 *************************************

  /**
   * 토큰을 갱신한다.
   * 
   * @param body 데이터
   */
  refreshToken(): Observable<any> {
    return this.restService.create(`${this.uri}/refreshToken`, this.session.getToken());
  }
}
