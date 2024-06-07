import { environment } from 'src/environments/environment';
import { HttpRequest } from '@angular/common/http';

class Request extends HttpRequest<any> { }

export class ApiMap {
  /** Get all tasks */
  public static readonly getAllTasks: Request = new HttpRequest<any>(
    'GET',
    environment.baseApiUrl + '/tasks',
    {}
  );

  /** Create task */
  public static readonly createTask: Request = new HttpRequest<any>(
    'POST',
    environment.baseApiUrl + '/tasks',
    {},
  );

  /** Update task */
  public static readonly updateTask: Request = new HttpRequest<any>(
    'PUT',
    environment.baseApiUrl + '/tasks',
    {},
  );

  /** Delete task */
  public static readonly deleteTask: Request = new HttpRequest<any>(
    'DELETE',
    environment.baseApiUrl + '/tasks',
  );

  /** User login */
  public static readonly userLogin: Request = new HttpRequest<any>(
    'GET',
    environment.baseApiUrl + '/users',
    {}
  );

  /** Update tasks order */
  public static readonly updateTasksOrder: Request = new HttpRequest<any>(
    'POST',
    environment.baseApiUrl + '/tasks/update-order',
    {}
  );
}
