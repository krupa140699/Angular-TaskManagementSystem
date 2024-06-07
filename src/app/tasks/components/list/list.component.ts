import { Component, OnInit } from '@angular/core';
import { TaskModel } from '../../models/TaskModel';
import AppPages from 'src/app/common/constants/AppPages';
import { TaskService } from '../../services/task.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TaskStatus } from 'src/app/common/enums/TaskStatus';
import { DialogServiceService } from 'src/app/shared/services/dialog-service.service';
import { UserModel } from 'src/app/auth/models/UserModel';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserRole } from 'src/app/common/enums/UserRole';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonSnackbarComponent } from 'src/app/shared/components/common-snackbar/common-snackbar.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  AppPages = AppPages;
  TaskStatus = TaskStatus;
  UserRole = UserRole;
  taskList: TaskModel[];
  user: UserModel;
  durationInSeconds = 5;

  constructor(
    private _taskService: TaskService,
    private _authService: AuthService,
    private _dialogService: DialogServiceService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadTasks();
    // Load tasks for list from task behaviour subject
    this._taskService.tasks$.subscribe({
      next: (res) => {
        this.taskList = res;
      },
      error: (err) => {
        this.opneSnackbar(err);
      }
    });
    this.getUser();
  }

  // Get user data
  getUser() {
    this.user = this._authService.getUser();
  }

  // Get all tasks
  loadTasks() {
    this._taskService.getTasks().subscribe({
      next: (res) => { },
      error: (err) => {
        this.opneSnackbar(err);
      }
    });
  }

  // Delete task
  deleteTask(id: string) {
    this._dialogService.confirmDialog({
      data: {
        title: "Delete Confirm",
        message: "Are you sure want to delete?",
        confirmText: "Delete",
        cancelText: "Cancel",
      },
      panelClass: "delete-task-dialog",
      disableClose: false
    }).subscribe(res => {
      if (res) {
        this._taskService.deleteTask(id).subscribe({
          next: (res) => {
            this.loadTasks();
          },
          error: (err) => {
            this.opneSnackbar(err);
          }
        })
      }
    });
  }

  // Drop event on task card drop
  drop(event: CdkDragDrop<TaskModel[]>) {
    moveItemInArray(this.taskList, event.previousIndex, event.currentIndex);
    this.taskList.forEach((task, index) => task.order = index + 1);
    // this._taskService.updateTasksOrder(this.taskList).subscribe({
    //   next: (res) => { },
    //   error: (err) => {
    //     this.opneSnackbar(err);
    //   }
    // });
  }

  // Mark the task as completed
  markAsComplete(task: TaskModel) {
    if (task.status != TaskStatus.Completed) {
      task.status = TaskStatus.Completed;
      this._taskService.updateTask(task.id, task).subscribe({
        next: () => {
          this.loadTasks();
        },
        error: (err) => {
          this.opneSnackbar(err);
        }
      });
    }
  }

  // Show error snackbar message
  opneSnackbar(errMsg: any) {
    this._snackBar.openFromComponent(CommonSnackbarComponent, {
      duration: this.durationInSeconds * 1000,
      data: errMsg,
      panelClass: 'error-snackbar'
    });
  }
}
