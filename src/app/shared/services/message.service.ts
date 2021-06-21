import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MessageService {
  constructor() { }

  // 일반 메시지
  private readonly GENERAL = {
    create: '생성되었습니다.',
    update: '수정되었습니다.',
  }

  // 오류 메시지
  private readonly ERROR = {
    duplicate: '이미 존재합니다.',
  }

  get general() {
    return this.GENERAL;
  }
  get error() {
    return this.ERROR;
  }

}
