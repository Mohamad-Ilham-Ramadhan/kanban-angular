import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'count',
  standalone: true
})
export class CountPipe implements PipeTransform {

  transform(array: any[], key: string): string | number {
    return array.reduce((acc, cv) => {
      return cv[key] ? acc + 1 : acc;
    },0);
  }

}
