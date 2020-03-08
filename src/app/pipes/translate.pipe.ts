import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  transform(cat: string, ...args: any[]): string {
    if(cat == "RIM") return "Felgi";
    if(cat == "GEARBOX") return "Skrzycie biegów";
    if(cat == "ENGINE") return "Silniki";
  }

}
