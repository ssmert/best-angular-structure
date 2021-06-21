import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  private local: any;
  // 저장소 키
  private readonly STORAGE_KEY: any = {
    isLogin: 'isLogin',
    id: 'id',
    name: 'name',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken'
  };

  constructor() { this.local = localStorage; }

  set(key: any, value: any): void {
    this.local.setItem(key, value);
  }

  get(key: string): any {
    return this.local.getItem(key);
  }

  remove(key: string): void {
    this.local.removeItem(key);
  }

  clear(): void {
    this.local.clear();
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
}
