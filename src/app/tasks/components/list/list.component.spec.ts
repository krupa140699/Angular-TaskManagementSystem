import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { TaskService } from '../../services/task.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DialogServiceService } from 'src/app/shared/services/dialog-service.service';
import { of } from 'rxjs';
import { TaskModel } from '../../models/TaskModel';
import { TaskStatus } from 'src/app/common/enums/TaskStatus';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let taskService: TaskService;
  let authService: AuthService;
  let dialogService: DialogServiceService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      providers: [ TaskService, AuthService, DialogServiceService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService);
    authService = TestBed.inject(AuthService);
    dialogService = TestBed.inject(DialogServiceService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks on initialization', () => {
    const dummyTasks: TaskModel[] = [{
      id: '1', title: 'Task 1',
      description: '',
      dueDate: '',
      status: '',
      order: 0
    }];
    spyOn(taskService, 'getTasks').and.returnValue(of(dummyTasks));

    component.ngOnInit();

    expect(taskService.getTasks).toHaveBeenCalled();
    expect(component.taskList).toEqual(dummyTasks);
  });

  it('should delete task', () => {
    spyOn(dialogService, 'confirmDialog').and.returnValue(of(true));
    spyOn(taskService, 'deleteTask').and.returnValue(of(null));

    component.deleteTask('1');

    expect(dialogService.confirmDialog).toHaveBeenCalled();
    expect(taskService.deleteTask).toHaveBeenCalledWith('1');
  });

  it('should handle task drop within same list', () => {
    const tasks: TaskModel[] = [{
      id: '1', title: 'Task 1', order: 1,
      description: '',
      dueDate: '',
      status: ''
    }];
    const event: CdkDragDrop<TaskModel[]> = {
      previousContainer: { data: tasks } as any,
      container: { data: tasks } as any,
      previousIndex: 0,
      currentIndex: 0,
      item: {} as any
    };

    spyOn(taskService, 'updateTasksOrder').and.returnValue(of(null as any));

    component.drop(event);

    expect(taskService.updateTasksOrder).toHaveBeenCalledWith(tasks);
  });

  it('should handle task drop to different list', () => {
    const sourceList: TaskModel[] = [{
      id: '1', title: 'Task 1', order: 1,
      description: '',
      dueDate: '',
      status: ''
    }];
    const targetList: TaskModel[] = [];
    const event: CdkDragDrop<TaskModel[]> = {
      previousContainer: { data: sourceList } as any,
      container: { data: targetList } as any,
      previousIndex: 0,
      currentIndex: 0,
      item: {} as any,
      isPointerOverContainer: false,
      distance: {
        x: 0,
        y: 0
      },
      dropPoint: {
        x: 0,
        y: 0
      },
      event: undefined
    };

    spyOn(taskService, 'updateTasksOrder').and.returnValue(of(null as any));
    spyOn(component, 'loadTasks').and.returnValue(null as any);

    component.drop(event);

    expect(taskService.updateTasksOrder).toHaveBeenCalledWith(targetList);
    expect(component.loadTasks).toHaveBeenCalled();
  });

  it('should mark task as complete', () => {
    const task: TaskModel = {
      id: '1', title: 'Task 1', status: TaskStatus.Pending,
      description: '',
      dueDate: '',
      order: 0
    };
    spyOn(taskService, 'updateTask').and.returnValue(of(null as any));
    spyOn(component, 'loadTasks').and.returnValue(null as any);

    component.markAsComplete(task);

    expect(taskService.updateTask).toHaveBeenCalledWith('1', { ...task, status: TaskStatus.Completed });
    expect(component.loadTasks).toHaveBeenCalled();
  });

});
