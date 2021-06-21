import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

// 정렬 컬럼
export type SortColumn = string;
// 정렬 방향
export type SortDirection = 'asc' | 'desc' | '';
// 정렬 방향 회전
const rotate: { [key: string]: SortDirection } = { asc: 'desc', desc: '', '': 'asc' };

// 정렬 이벤트
export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

/**
 * 정렬 디렉티브이다.
 */
@Directive({ selector: 'th[sortable]' })
export class SortableDirective {
  // 오름차순일 경우 asc class를 추가한다.
  @HostBinding('class.asc') get asc(): boolean { return this.column === this.sortedColumn && this.direction === 'asc'; }
  // 내림차순일 경우 desc class를 추가한다.
  @HostBinding('class.desc') get desc(): boolean { return this.column === this.sortedColumn && this.direction === 'desc'; }

  // 정렬할 방향
  direction: SortDirection = '';
  // 정렬할 컬럼
  @Input() column: SortColumn = '';
  // 정렬된 컬럼
  @Input('sorted') sortedColumn: SortColumn = '';

  // 정렬 결과 이벤트 반환 함수
  @Output() sort = new EventEmitter<SortEvent>();

  // 클릭 이벤트 리스너
  @HostListener('click') onClick(): void {
    this.rotate();
  }

  /**
   * 정렬 방향을 설정하고 이벤트를 적용한다.
   */
  rotate(): void {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.column, direction: this.direction });
  }
}
