//get first letter of the first name and last name

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'assigneeName'
})
export class AssigneeNamePipe implements PipeTransform {
  transform(value: string): string {
    if (value.includes(' ')) {
      return value.split(' ')[0].charAt(0).toUpperCase() + value.split(' ')[1].charAt(0).toUpperCase();
    } else {
        // take first 2 letters of the value
      return value.substring(0, 2).toUpperCase();
    }
  }
}