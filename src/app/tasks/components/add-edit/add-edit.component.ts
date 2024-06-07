import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { TaskModel } from '../../models/TaskModel';
import { TaskStatus } from 'src/app/common/enums/TaskStatus';
import AppPages from 'src/app/common/constants/AppPages';
import { CommonSnackbarComponent } from 'src/app/shared/components/common-snackbar/common-snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  taskForm: FormGroup;
  taskId: string = '';
  isEditMode: boolean = false;
  taskList: TaskModel[] = [];
  minDate: Date = new Date();
  AppPages = AppPages;
  durationInSeconds = 5;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    // Task form initialization
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      status: [TaskStatus.Pending, Validators.required]
    });

    // Get all tasks
    this.taskService.tasks$.subscribe(tasks => {
      this.taskList = tasks || [];
    });

    const taskIdParam = this.route.snapshot.paramMap.get('id');
    if (taskIdParam !== null) { // Check if taskIdParam is not null
      this.taskId = taskIdParam;
      this.isEditMode = true;
      this.loadTask();
    }
  }

  // Get single task based on id
  loadTask() {
    this.taskService.getTaskById(this.taskId).subscribe({
      next: (task) => {
        this.taskForm.patchValue(task);
      },
      error: (err) => {
        this.opneSnackbar(err);
      }
    });
  }

  //  Change task order
  getNewTaskOrder(): number {
    if (this.taskList.length === 0) {
      return 1;
    }
    const highestOrderTask = this.taskList.reduce((prev, current) => (prev.order > current.order) ? prev : current);
    return highestOrderTask.order + 1;
  }

  // Submit task form
  onSubmit() {
    if (this.taskForm.invalid) {
      return;
    }

    let formData = this.taskForm.value;
    const newTask: TaskModel = {
      ...formData,
      id: this.isEditMode ? this.taskId : new Date().getTime().toString(),
      order: this.isEditMode ? this.findTaskOrderById(this.taskId) : this.getNewTaskOrder()
    };

    if (this.isEditMode) {
      // Edit task
      this.taskService.updateTask(this.taskId, newTask).subscribe({
        next: (res) => {
          this.router.navigate(['/tasks']);
        },
        error: (err) => {
          this.opneSnackbar(err);
        }
      });
    } else {
      // Add task
      this.taskService.addTask(newTask).subscribe({
        next: (res) => {
          this.router.navigate(['/tasks']);
        },
        error: (err) => {
          this.opneSnackbar(err);
        }
      });
    }
  }

  // Find task order based on task id
  findTaskOrderById(id: string): number {
    const task = this.taskList.find(task => task.id === id);
    return task ? task.order : 1;
  }

  // Get task status label
  getStatusLabel(statusValue: string): string {
    switch (statusValue) {
      case '1':
        return 'Pending';
      case '2':
        return 'In Progress';
      case '3':
        return 'Completed';
      default:
        return '';
    }
  }

  // Show error snackbar
  opneSnackbar(errMsg: any) {
    this._snackBar.openFromComponent(CommonSnackbarComponent, {
      duration: this.durationInSeconds * 1000,
      data: errMsg,
      panelClass: 'error-snackbar'
    });
  }

}
