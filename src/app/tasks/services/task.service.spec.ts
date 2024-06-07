import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
import { TaskService } from './task.service';
import { DataService } from 'src/app/core/data.service';
import { TaskModel } from '../models/TaskModel';
import { ApiMap } from 'src/app/common/api.map';

describe('TaskService', () => {
  let service: TaskService;
  let dataServiceStub: any;

  beforeEach(() => {
    dataServiceStub = {
      get: jasmine.createSpy('get').and.callFake((url: string) => {
        if (url === ApiMap.getAllTasks.url) {
          return of([{ id: '1', name: 'Test Task', order: 1 }]);
        } else {
          return of({ id: '1', name: 'Test Task', order: 1 });
        }
      }),
      post: jasmine.createSpy('post').and.returnValue(of({ id: '1', name: 'Test Task', order: 1 })),
      put: jasmine.createSpy('put').and.returnValue(of({ id: '1', name: 'Updated Task', order: 1 })),
      delete: jasmine.createSpy('delete').and.returnValue(of(null))
    };

    TestBed.configureTestingModule({
      providers: [
        TaskService,
        { provide: DataService, useValue: dataServiceStub }
      ]
    });

    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch and update tasks', () => {
    service.getTasks().subscribe(tasks => {
      expect(tasks).toEqual([{ id: '1', title: 'Test Task', order: 1 }]);
    });

    expect(dataServiceStub.get).toHaveBeenCalledWith(ApiMap.getAllTasks.url);
  });

  it('should fetch task by id', () => {
    service.getTaskById('1').subscribe(task => {
      expect(task).toEqual({ id: '1', title: 'Test Task', order: 1 });
    });

    expect(dataServiceStub.get).toHaveBeenCalledWith(`${ApiMap.getAllTasks.url}/1`);
  });

  it('should add a new task and update tasks', () => {
    const newTask: TaskModel = { id: '2', title: 'New Task', order: 2 };

    service.addTask(newTask).subscribe(() => {
      const tasks = service.tasksSubject.value;
      expect(tasks).toContain(newTask);
    });

    expect(dataServiceStub.post).toHaveBeenCalledWith(ApiMap.createTask.url, newTask);
  });

  it('should update a task', () => {
    const updatedTask: TaskModel = { id: '1', title: 'Updated Task', order: 1 };

    service.updateTask('1', updatedTask).subscribe(task => {
      expect(task).toEqual(updatedTask);
    });

    expect(dataServiceStub.put).toHaveBeenCalledWith(`${ApiMap.updateTask.url}/1`, { name: 'Updated Task', order: 1 });
  });

  it('should delete a task and update tasks', () => {
    const tasks: TaskModel[] = [{ id: '1', title: 'Test Task', order: 1 }];
    service['tasksSubject'].next(tasks);

    service.deleteTask('1').subscribe(() => {
      const updatedTasks = service.tasksSubject.value;
      expect(updatedTasks).not.toContain({ id: '1', title: 'Test Task', order: 1 });
    });

    expect(dataServiceStub.delete).toHaveBeenCalledWith(`${ApiMap.deleteTask.url}/1`);
  });

  it('should update tasks order', () => {
    const tasks: TaskModel[] = [
      { id: '1', title: 'Task 1', order: 1 },
      { id: '2', title: 'Task 2', order: 2 }
    ];

    service.updateTasksOrder(tasks).subscribe(() => {
      expect(service.tasksSubject.value).toEqual(tasks);
    });

    expect(dataServiceStub.post).toHaveBeenCalledWith(ApiMap.updateTasksOrder.url, [
      { id: '1', order: 1 },
      { id: '2', order: 2 }
    ]);
  });
});
