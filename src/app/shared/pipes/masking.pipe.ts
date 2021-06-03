import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'masking' })
export class MaskingPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
