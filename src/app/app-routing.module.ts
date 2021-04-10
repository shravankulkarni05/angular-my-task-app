import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskDashboardComponent } from './features/task-board/task-dashboard/task-dashboard.component';
const routes: Routes = [
  {
    path: '', component: TaskDashboardComponent
  },
  {
    path: 'tasks', component: TaskDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
