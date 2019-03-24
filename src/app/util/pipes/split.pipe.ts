import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'split'})
export class SplitPipe implements PipeTransform {
    transform(val: any): any {
    if (!val) {
      return;
    }
    console.log('what ? ' + val.split(','));
    return val.split(/[,:]/);
  }
}
