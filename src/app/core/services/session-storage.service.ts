import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SessionStorageService {
  private session: any;
  // 저장소 키
  private readonly STORAGE_KEY: any = {
    isLogin: 'il',
    id: 'i',
    name: 'n',
    accessToken: 'ac',
    refreshToken: 'rf'
  };

  constructor() { this.session = sessionStorage; }

  set(key: any, value: any): void {
    this.session.setItem(key, value);
  }

  get(key: string): any {
    return this.session.getItem(key);
  }

  remove(key: string): void {
    this.session.removeItem(key);
  }

  clear(): void {
    this.session.clear();
  }

  /**
   * 로그인 여부를 반환한다.
   */
  getIsLogin(): boolean {
    return 'true' === this.get(this.STORAGE_KEY.isLogin);
  }

  /**
   * 토큰을 반환한다.
   */
  getToken(): string {
    return this.get(this.STORAGE_KEY.token);
  }

  /**
   * 토큰을 설정한다.
   * 
   * @param accessToken 엑세스 토큰
   * @param refreshToken 리프레시 토큰
   */
  setToken(accessToken: any, refreshToken: any) {
    this.set(this.STORAGE_KEY.accessToken, accessToken);
    this.set(this.STORAGE_KEY.refreshToken, refreshToken);
  }
}
