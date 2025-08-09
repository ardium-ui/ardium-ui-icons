import { Pipe, PipeTransform } from '@angular/core';
import { lower as toLowerCase } from 'case';

@Pipe({
  name: 'iconDisplayName'
})
export class IconDisplayNamePipe implements PipeTransform {
  transform(value: string): string {
    return toLowerCase(value);
  }
}
