import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { ListComponent } from './components/list/list.component';
import { AddEditComponent } from './components/add-edit/add-edit.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MatComponentsModule } from '../shared/mat-components.module';
import { TaskStatusPipe } from '../pipes/task-status.pipe';


@NgModule({
  declarations: [
    ListComponent,
    AddEditComponent,
    TaskStatusPipe
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    SharedModule,
    RouterModule,
    MatComponentsModule
  ]
})
export class TasksModule { }
