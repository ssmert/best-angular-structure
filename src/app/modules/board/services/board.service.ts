import { Injectable } from '@angular/core';
import { RestService } from '@core/services/rest.service';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private uri: string = 'boards';

  // ! ************************************** 초기화 메서드 ***************************************

  constructor(private restService: RestService) { }

  // ! ************************************** 서버 거래 메서드 *************************************

}
