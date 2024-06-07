import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import AppPages from '../common/constants/AppPages';
import { AddEditComponent } from './components/add-edit/add-edit.component';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: ListComponent
  },
  {
    path: `${AppPages.CreateTask}`,
    pathMatch: "full",
    component: AddEditComponent
  },
  {
    path: `${AppPages.EditTask}/:id`,
    pathMatch: "full",
    component: AddEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
