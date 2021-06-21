import { Injectable } from '@angular/core';
import { RestService } from '@core/services/rest.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  private uri: string = 'users';

  // ! ************************************** 초기화 메서드 ***************************************

  constructor(private restService: RestService) { }

  // ! ************************************** 서버 거래 메서드 *************************************

}
