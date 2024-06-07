import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import AppPages from './common/constants/AppPages';
import { AuthGuard } from './common/guards/auth.guard';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: `${AppPages.Tasks}`,
  },
  {
    path: `${AppPages.Tasks}`,
    loadChildren: () => import("./tasks/tasks.module").then((m) => m.TasksModule),
    canActivate: [AuthGuard]
  },
  {
    path: `${AppPages.Login}`,
    pathMatch: "full",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
