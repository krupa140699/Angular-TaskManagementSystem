import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { TaskModel } from '../models/TaskModel';
import { DataService } from 'src/app/core/data.service';
import { ApiMap } from 'src/app/common/api.map';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  // Task list behaviour subject
  private tasksSubject = new BehaviorSubject<TaskModel[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor(
    private _dataService: DataService
  ) { }

  // Get all tasks
  getTasks(): Observable<TaskModel[]> {
    return this._dataService.get<TaskModel[]>(ApiMap.getAllTasks.url).pipe(
      tap((tasks: TaskModel[]) => {
        tasks.sort((a, b) => a.order - b.order);  // Ensure tasks are sorted by order
        this.tasksSubject.next(tasks);
      })
    );
  }

  // Get task by id
  getTaskById(id: string): Observable<TaskModel> {
    return this._dataService.get<TaskModel>(`${ApiMap.getAllTasks.url}/${id}`);
  }

  // Add new task
  addTask(task: TaskModel) {
    let body = task;
    return this._dataService.post<TaskModel>(ApiMap.createTask.url, body).pipe(
      tap(res => {
        const tasks = this.tasksSubject.value;
        tasks.push(task);
        this.tasksSubject.next(tasks);
      })
    );
  }

  // Update task by task id
  updateTask(taskId: string, updatedTask: TaskModel): Observable<TaskModel> {
    const {id, ...updatedBody} = {...updatedTask};
    return this._dataService.put<TaskModel>(`${ApiMap.updateTask.url}/${taskId}`, updatedBody);
  }

  // Delete task by task id
  deleteTask(taskId: string): Observable<any> {
    return this._dataService.delete<TaskModel>(`${ApiMap.deleteTask.url}/${taskId}`).pipe(
      tap(res => {
        const tasks = this.tasksSubject.value.filter(task => task.id !== taskId);
        this.tasksSubject.next(tasks);
      })
    );
  }

  // Change task order
  updateTasksOrder(tasks: TaskModel[]): Observable<void> {
    const updatedTasks = tasks.map(task => ({
      id: task.id,
      order: task.order
    }));
    return this._dataService.post<void>(ApiMap.updateTasksOrder.url, updatedTasks).pipe(
      tap(() => {
        this.tasksSubject.next(tasks);
      })
    );
  }
}
