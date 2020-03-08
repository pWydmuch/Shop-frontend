import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toZloty'
})
export class ToZlotyPipe implements PipeTransform {

  transform(value: string, ...args: any[]): string {
    return value + ' zł';
  }


}
