import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RouteType } from '@shared/enum/route-type';

@Injectable({ providedIn: 'root' })
export class UtilService {

  /**
   * 
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

}
