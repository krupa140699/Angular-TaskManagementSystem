import { Pipe, PipeTransform } from '@angular/core';
import { TaskStatus } from '../common/enums/TaskStatus';

@Pipe({
  name: 'taskStatus'
})
export class TaskStatusPipe implements PipeTransform {
  TaskStatus = TaskStatus;
  transform(value: unknown, ...args: unknown[]): string {
    switch(value) {
      case TaskStatus.Pending:
        return 'Pending';

      case TaskStatus.InProgress:
        return 'In progress';

      case TaskStatus.Completed:
        return 'Completed';

      default:
        return 'Pending';
    }
  }

}
