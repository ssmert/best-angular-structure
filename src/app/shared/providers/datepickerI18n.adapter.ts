import { Injectable } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

// 일주일
const weekdays: Array<string> = ['월', '화', '수', '목', '금', '토', '일'];

@Injectable()
export class DatepickerAdapter extends NgbDatepickerI18n {
    hoveredDate: NgbDate | null = null;
    fromDate: NgbDate | null;
    toDate: NgbDate | null;

    constructor(public calendar: NgbCalendar, public formatter: NgbDateParserFormatter) {
        super();
    }

    getDayNumerals(date: NgbDateStruct): string { return date.day + '일'; }
    getWeekNumerals(weekNumber: number): string { return weekNumber + '주'; }
    getYearNumerals(year: number): string { return year + '년'; }

    // 주 약어 표시
    getWeekdayShortName(weekday: number): string { return weekdays[weekday - 1]; }
    // 월 약어 표시
    getMonthShortName(month: number): string { return month + '월'; }
    // 월 전체 표시
    getMonthFullName(month: number): string { return month + '월'; }
    // 일 aria-label
    getDayAriaLabel(date: NgbDateStruct): string { return `${date.year}-${date.month}-${date.day}`; }

    /**
     * 날짜 선택 이벤트 함수
     * @param date 일자
     */
    onDateSelection(date: NgbDate): void {
        if (!this.fromDate && !this.toDate) {
            this.toDate = null;
            this.fromDate = date;
        }
        else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
            this.toDate = date;
        }
        else {
            this.toDate = null;
            this.fromDate = date;
        }
    }

    /**
     * 마우스 오버 이벤트 함수
     * @param date 일자
     */
    isHovered(date: NgbDate): boolean {
        return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
    }

    /**
     * 범위 지정 이벤트 함수
     * @param date 일자
     */
    isRange(date: NgbDate): boolean {
        return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
    }

    /**
     * 일자가 범위 안에 포함하는지 여부 체크
     * 
     * @param date 일자
     */
    isInside(date: NgbDate): boolean {
        return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
    }

    /**
     * 모든 날짜를 초기화한다.
     */
    clearDate(): void {
        this.fromDate = null;
        this.toDate = null;
    }

    /**
     * 입력값 유효성 검증을 한다.
     * @param currentValue 현재 값
     * @param input 입력값
     */
    validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
        const parsed = this.formatter.parse(input);
        return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
    }
}
