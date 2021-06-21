import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ConfigurationService } from '@core/services/configuration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /**
   * 생성자
   * 
   * @constructor
   * 
   * @param router 라우터
   * @param sessionService 세션 서비스 
   * @param utilService 유틸 서비스
   */
  constructor(private router: Router,
    private config: ConfigurationService) {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }

      // main 화면이 아닐 경우
      if (evt.url !== '/main') {
      }
    });
  }
}
