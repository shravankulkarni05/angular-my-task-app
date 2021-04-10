import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'findItem',
  pure: true
})
export class FindItemPipe implements PipeTransform {

  transform(priorityId: string, priorities: any[]) {
    if (!priorityId || !priorities || (priorities.length === 0)) {
      return {};
    }
    const index = priorities.findIndex(p => p.id === priorityId)
    if (index > -1) {
      return priorities[index];
    }
    return {};
  }

}
