import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toZloty'
})
export class ToZlotyPipe implements PipeTransform {

  transform(value: number, ...args: any[]): string {
    return value + ' zł';
  }


}
