import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskDashboardComponent } from './task-dashboard/task-dashboard.component';
import { TaskGridViewComponent } from './task-grid-view/task-grid-view.component';
import { TaskKanbanViewComponent } from './task-kanban-view/task-kanban-view.component';
import { TaskCardComponent } from './task-card/task-card.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { TaskBoardHeaderComponent } from './task-board-header/task-board-header.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';
import { ColorCircleModule } from 'ngx-color/circle';
import { ColorSketchModule } from 'ngx-color/sketch';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { AddButtonModule } from 'src/app/shared/add-button/add-button.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonPipesModule } from 'src/app/shared/pipes/common-pipes.module';

@NgModule({
  declarations: [
    TaskDashboardComponent,
    TaskGridViewComponent,
    TaskKanbanViewComponent,
    TaskCardComponent,
    TaskBoardHeaderComponent,
    CategoryDialogComponent,
    TaskDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    DragDropModule,
    ColorCircleModule,
    ColorSketchModule,
    AddButtonModule,
    CommonPipesModule
  ],
  providers: [CategoryDialogComponent, TaskDialogComponent]
})
export class TaskBoardModule {}
