import { Pipe, PipeTransform } from '@angular/core';
import { upper as toUpperCase } from 'case';

@Pipe({
  name: 'iconDisplayName'
})
export class IconDisplayNamePipe implements PipeTransform {
  transform(value: string): string {
    return toUpperCase(value);
  }
}
