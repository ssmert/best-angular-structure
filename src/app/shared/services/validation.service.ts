import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidationService {
    constructor() { }

    /**
     * 검증한 값에 대한 오류 메시지를 반환한다.
     * 
     * @param validatorName 검증명
     * @param validatorValue 검증값
     */
    static getErrorMessage(validatorName: string, validatorValue?: any): any {
        const errorMessages = {
            required: '필수 입력 값입니다.',
            invalidId: `포함 불가문자(한글, ", ')`,
            invalidNm: `한글, 영문만 입력할 수 있습니다.`,
            invalidDesc: `포함 불가문자(", ')`,
            invalidPassword: '특수문자, 영문, 숫자 조합으로 8자 이상 12자까지만 사용할 수 있습니다.',
            invalidMatchPassword: '비밀번호가 일치하지 않습니다.',
            invalidEmail: '유효한 형식이 아닙니다. ex) ikoob@ikoob.com',
            invalidPhone: '유효한 형식이 아닙니다. ex) 01055550000',
            invalidTel: '유효한 형식이 아닙니다. ex) 025550000',
            invalidEnAndNum: '영/숫자만 입력 가능합니다.',
            invalidEnAndKo: '영문과 한글만 입력 가능합니다.',
            invalidEnAndKoAndNum: '영/숫자와 한글만 입력 가능합니다.',
            koValidator: '한글만 입력 가능합니다.',
            invalidNum: '숫자만 입력 가능합니다.',
            minlength: `최소 ${validatorValue.requiredLength}자리 입력 해야합니다.`,
            maxlength: `최대 ${validatorValue.requiredLength}자리 입력 가능합니다.`,
            min: `최소 ${validatorValue.min}부터 입력가능합니다.`,
            max: `최대 ${validatorValue.max}까지 입력가능합니다.`
        };

        return errorMessages[validatorName];
    }

    /**
     * 아이디 정규식 체크
     * 
     * @param control 폼 컨트롤
     */
    static idValidator(control: FormControl): any {
        if (null != control.value) {
            if (!control.value.match(/[ㄱ-ㅎ가-힣"']/g)) {
                return null;
            }

            return { invalidId: true };
        }
    }

    /**
     * 이메일 정규식 체크
     * 
     * @param control 폼 컨트롤
     */
    static emailValidator(control: FormControl): any {
        if (null != control.value) {
            if (/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(control.value)) {
                return null;
            }

            return { invalidEmail: true };
        }
    }

    /**
     * 핸드폰 정규식 체크
     * 
     * @param control 폼 컨트롤
     */
    static phoneValidator(control: FormControl): any {
        if (null != control.value) {
            if (/^(01[1|6-9])[0-9]{7,8}$|^(010)\d{8}$/.test(control.value)) {
                return null;
            }

            return { invalidPhone: true };
        }
    }

    /**
     * 전화 정규식 체크
     * 
     * @param control 폼 컨트롤
     */
    static telValidator(control: FormControl): any {
        if (null !== control.value && '' !== control.value) {
            if (control.value.match(/^\d{2,3}\d{3,4}\d{4}$/)) {
                return null;
            }

            return { invalidTel: true };
        }
    }

    /**
     * 영어 및 숫자 정규식 체크
     * 
     * @param control 폼 컨트롤
     */
    static nmValidator(control: FormControl): any {
        if (null != control.value) {
            if (control.value.match(/^[ㄱ-ㅣ가-힣a-zA-Z\s]+$/g)) {
                return null;
            }

            return { invalidNm: true };
        }
    }

    /**
     * 영어 및 숫자 정규식 체크
     * 
     * @param control 폼 컨트롤
     */
    static descValidator(control: FormControl): any {
        if (null != control.value) {
            if (!control.value.match(/["']/g)) {
                return null;
            }

            return { invalidDesc: true };
        }
    }

    /**
     * 비밀번호 정규식 체크 
     * 
     * @param control 폼 컨트롤
     */
    static passwordValidator(control: FormControl): any {
        if (null != control.value) {
            // 특수문자, 영문, 숫자 조합으로 8자 이상 12자
            // (?=.*[0-9])       - 문자열에 최소한 숫자가 포함되어 있어야 한다.
            if (control.value.match(/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,12}$/)) {
                return null;
            }

            return { invalidPassword: true };
        }
    }

    /**
     * 비밀번호 일치 체크 
     * 
     * @param formGroup 폼 그룹
     */
    static invalidMatchPassword(formGroup: FormGroup): any {
        const pwd = formGroup.value.userNewPwd ? formGroup.value.userNewPwd : formGroup.value.userPwd;
        const checkPwd = formGroup.value.userNewPwdCheck ? formGroup.value.userNewPwdCheck : formGroup.value.userPwdCheck;

        if (null != pwd && null != checkPwd) {
            if (pwd === checkPwd) {
                return null;
            }

            return { invalidMatchPassword: true };
        }
    }

    /**
     * 영어 및 숫자 정규식 체크
     * 
     * @param control 폼 컨트롤
     */
    static enAndNumValidator(control: FormControl): any {
        if (null != control.value) {
            if (control.value.match(/^[a-zA-Z0-9\s]+$/g)) {
                return null;
            }

            return { invalidEnAndNum: true };
        }
    }

    /**
     * 영어 및 한글 정규식 체크
     * 
     * @param control 폼 컨트롤
     */
    static enAndKoValidator(control: FormControl): any {
        if (null != control.value) {
            if (control.value.match(/^[가-힣a-zA-Z\s]+$/g)) {
                return null;
            }

            return { invalidEnAndKo: true };
        }
    }

    /**
     * 한글 정규식 체크
     * 
     * @param control 폼 컨트롤
     */
    static koValidator(control: FormControl): any {
        if (null != control.value) {
            if (control.value.match(/^[ㄱ-ㅣ가-힣\s]+$/g)) {
                return null;
            }

            return { invalidKo: true };
        }
    }

    /**
     * 영어, 한글, 숫자 정규식 체크
     * 
     * @param control 폼 컨트롤
     */
    static enAndKoAndNumValidator(control: FormControl): any {
        if (null != control.value) {
            if (control.value.match(/^[0-9가-힣a-zA-Z\s]+$/g)) {
                return null;
            }

            return { invalidEnAndKoAndNum: true };
        }
    }

    /**
     * 숫자 정규식 체크
     * 
     * @param control 폼 컨트롤
     */
    static numValidator(control: FormControl): any {
        if (null != control.value) {
            if (control.value.match(/^[0-9]+$/g)) {
                return null;
            }

            return { invalidNum: true };
        }
    }
}
