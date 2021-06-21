import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'mask' })
export class MaskingPipe implements PipeTransform {
  /**
   * 입력받은 값을 마스킹한다.
   * 
   * @param value 값
   * @param target [name, date, kr-date, phone]
   * @param position [center]
   * 
   * @returns 마스킹 값
   */
  transform(value: any, target?: any, position?: any): any {
    // 전체 마스킹(스페이스 제외)
    let tVal = value;
    switch (target) {
      case 'name':
        if (null !== value && undefined !== value && '' !== value) {
          tVal = this.name(tVal, position);
        }
        break;

      case 'date':
      case 'kr-date':
        if (null !== value && undefined !== value && '' !== value) {
          tVal = this.date(tVal, target);
        }
        break;

      case 'phone':
        if (null !== value && undefined !== value && '' !== value) {
          tVal = this.phone(tVal, position);
        }
        break;

      // 전체 마스킹(스페이스 제외)
      default:
        if (null !== value && undefined !== value && '' !== value) {
          tVal = value.trim().replace(/\S/gi, '*');
        }
        break;
    }

    return tVal;
  }

  /**
   * 이름을 마스킹한다.
   * 
   * @param val 값
   * @param position 위치
   * 
   * @returns 마스킹 값
   */
  name(val: string, position?: string): string {
    const mVal = val;

    // 값 유효성 체크
    const isMach = val.match(/[ㄱ-ㅣ가-힣a-zA-Z0-9\s]+$/gi);
    if (null === isMach) {
      return mVal;
    }

    // 배열로 변환해서 중간값만 마스킹한다.
    const mVals = isMach.toString().split('');
    for (let index = 0; index < mVals.length; index++) {
      // 첫번째, 마지막 값 제외
      if (0 !== index && mVals.length - 1 !== index) {
        mVals[index] = mVals[index].replace(/\S/, '*');
      }
    }

    return mVals.join('');
  }

  /**
   * 날짜를 마스킹한다.
   * 
   * @param val 값
   * @param target 대상
   * 
   * @returns 마스킹 값
   */
  date(val: string, target?: string): string {
    let mVal = val;
    let isMach = null;

    switch (target) {
      case 'kr-date':
        isMach = val.match(/[0-9]{4}년 [0-9]{2}월 [0-9]{2}일/gi);
        break;
      default:
        isMach = val.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/gi);
        break;
    }

    // 값 유효성 체크
    if (null === isMach) {
      return mVal;
    }

    switch (target) {
      case 'kr-date':
        // 월일만 마스킹
        mVal = isMach.toString().replace(/[0-9]{2}월 [0-9]{2}일/g, '**월 **일');
        break;
      default:
        mVal = isMach.toString().replace(/-[0-9]{2}-[0-9]{2}/g, '-**-**');
        break;
    }

    return mVal;
  }

  /**
   * 전화번호를 마스킹한다.
   * 
   * @param val 값
   * @param position 위치
   * 
   * @returns 마스킹 값
   */
  phone(val: string, position?: string): string {
    let mVal = val;

    // 값 유효성 체크
    const isMach = val.match(/\d{3}-\d{3,4}-\d{4}/gi);
    if (null === isMach) {
      return mVal;
    }

    switch (position) {
      // 가운데만 마스킹
      case 'center':
        if (val.match(/\d{3}-\d{3}-\d{4}/gi)) {
          mVal = isMach.toString().replace(/-[0-9]{3}-/g, '-***-');
        } else if (val.match(/\d{3}-\d{4}-\d{4}/gi)) {
          mVal = isMach.toString().replace(/-[0-9]{4}-/g, '-****-');
        }
        break;
      // 국번 빼고 마스킹
      case 'end':
        if (val.match(/\d{3}-\d{3}-\d{4}/gi)) {
          mVal = isMach.toString().replace(/-\d{3}-\d{4}/gi, '-***-****');
        } else if (val.match(/\d{3}-\d{4}-\d{4}/gi)) {
          mVal = isMach.toString().replace(/-\d{4}-\d{4}/gi, '-****-****');
        }
        break;

      // 번호만 마스킹
      default:
        mVal = isMach.toString().replace(/[0-9]/g, '*');
        break;
    }

    return mVal;
  }

}
