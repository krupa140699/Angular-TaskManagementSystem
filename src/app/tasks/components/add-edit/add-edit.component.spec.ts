import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditComponent } from './add-edit.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { TaskModel } from '../../models/TaskModel';
import { TaskStatus } from 'src/app/common/enums/TaskStatus';

describe('AddEditComponent', () => {
  let component: AddEditComponent;
  let fixture: ComponentFixture<AddEditComponent>;
  let taskServiceStub: any;
  let routerStub: any;
  let activatedRouteStub: any;

  beforeEach(async () => {
    taskServiceStub = {
      tasks$: of([]),
      getTaskById: jasmine.createSpy('getTaskById').and.returnValue(of({ id: '1', title: 'Test Task', description: 'Test Description', dueDate: '2024-01-01', status: TaskStatus.Pending, order: 1 })),
      addTask: jasmine.createSpy('addTask').and.returnValue(of(null)),
      updateTask: jasmine.createSpy('updateTask').and.returnValue(of(null))
    };

    routerStub = {
      navigate: jasmine.createSpy('navigate')
    };

    activatedRouteStub = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue(null)
        }
      }
    };

    await TestBed.configureTestingModule({
      declarations: [AddEditComponent],
      providers: [
        FormBuilder,
        { provide: TaskService, useValue: taskServiceStub },
        { provide: Router, useValue: routerStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ],
      imports: [ReactiveFormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize task form on component init', () => {
    expect(component.taskForm).toBeTruthy();
    expect(component.taskForm.controls['title']).toBeTruthy();
    expect(component.taskForm.controls['description']).toBeTruthy();
    expect(component.taskForm.controls['dueDate']).toBeTruthy();
    expect(component.taskForm.controls['status']).toBeTruthy();
  });

  it('should load task if taskId is present in route params', () => {
    activatedRouteStub.snapshot.paramMap.get.and.returnValue('1');
    component.ngOnInit();
    expect(component.isEditMode).toBeTrue();
    expect(taskServiceStub.getTaskById).toHaveBeenCalledWith('1');
  });

  it('should call addTask method of taskService on form submit if not in edit mode', () => {
    component.taskForm.setValue({
      title: 'Test Task',
      description: 'Test Description',
      dueDate: '2024-01-01',
      status: TaskStatus.Pending
    });
    component.isEditMode = false;

    component.onSubmit();

    expect(taskServiceStub.addTask).toHaveBeenCalled();
    expect(routerStub.navigate).toHaveBeenCalledWith(['/tasks']);
  });

  it('should call updateTask method of taskService on form submit if in edit mode', () => {
    activatedRouteStub.snapshot.paramMap.get.and.returnValue('1');
    component.ngOnInit();
    component.taskForm.setValue({
      title: 'Updated Task',
      description: 'Updated Description',
      dueDate: '2024-01-02',
      status: TaskStatus.Completed
    });
    component.isEditMode = true;

    component.onSubmit();

    expect(taskServiceStub.updateTask).toHaveBeenCalledWith('1', jasmine.any(Object));
    expect(routerStub.navigate).toHaveBeenCalledWith(['/tasks']);
  });

  it('should not call taskService if form is invalid', () => {
    component.taskForm.setValue({
      title: '',
      description: '',
      dueDate: '',
      status: ''
    });

    component.onSubmit();

    expect(taskServiceStub.addTask).not.toHaveBeenCalled();
    expect(taskServiceStub.updateTask).not.toHaveBeenCalled();
  });

  it('should correctly get new task order', () => {
    component.taskList = [
      { id: '1', title: 'Task 1', description: 'Description 1', dueDate: '2024-01-01', status: TaskStatus.Pending, order: 1 },
      { id: '2', title: 'Task 2', description: 'Description 2', dueDate: '2024-01-02', status: TaskStatus.Pending, order: 2 }
    ];

    const newOrder = component.getNewTaskOrder();

    expect(newOrder).toBe(3);
  });

  it('should find task order by id', () => {
    component.taskList = [
      { id: '1', title: 'Task 1', description: 'Description 1', dueDate: '2024-01-01', status: TaskStatus.Pending, order: 1 }
    ];

    const order = component.findTaskOrderById('1');

    expect(order).toBe(1);
  });

  it('should return correct status label', () => {
    expect(component.getStatusLabel('1')).toBe('Pending');
    expect(component.getStatusLabel('2')).toBe('In Progress');
    expect(component.getStatusLabel('3')).toBe('Completed');
  });
});
