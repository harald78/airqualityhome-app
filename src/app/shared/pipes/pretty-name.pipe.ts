import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettyName',
  standalone: true
})
export class PrettyNamePipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
      .toUpperCase();
  }

}
