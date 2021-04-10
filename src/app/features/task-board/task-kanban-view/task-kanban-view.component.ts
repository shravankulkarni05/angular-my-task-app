import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DummyDataService } from 'src/app/core/dummy-data.service';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import {
  Task,
  TaskCategory,
  TaskData,
  TaskDialogConfig,
} from '../task.interfaces';

@Component({
  selector: 'app-task-kanban-view',
  templateUrl: './task-kanban-view.component.html',
  styleUrls: ['./task-kanban-view.component.css'],
})
export class TaskKanbanViewComponent implements OnInit, OnChanges {
  @Input() taskData: TaskData;
  @Input() category: TaskCategory;
  @Input() priorities: any[];
  @Output() taskUpdateOperation = new EventEmitter<boolean>();
  todo: Task[] = [];
  inProgress: Task[] = [];
  done: Task[] = [];
  boardIds = {
    todo: 'TODO',
    ip: 'IP',
    done: 'C',
  };
  _category: TaskCategory;

  constructor(
    private dataService: DummyDataService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  ngOnChanges() {
    if (!this._category || this.category.catId != this._category.catId) {
      this.resetBorads();
      this._category = this.category;
      if (this.taskData) {
        const taskData = JSON.parse(JSON.stringify(this.taskData));
        this.todo = taskData.todo;
        this.inProgress = taskData.inProgress;
        this.done = taskData.done;
      }
    }
  }

  private pushTaskByStatus(task: Task) {
    if (task.status === 'TODO') {
      this.todo.push(task);
    } else if (task.status === 'C') {
      this.done.push(task);
    } else if (task.status === 'IP') {
      this.inProgress.push(task);
    }
  }

  private resetBorads() {
    this.todo.length = 0;
    this.inProgress.length = 0;
    this.done.length = 0;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (
      event.previousContainer === event.container &&
      event.previousIndex === event.currentIndex
    ) {
      return;
    }
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      const currTask = event.container.data[event.currentIndex] as any;
      currTask.status = event.container.id;
    }
    this.dataService
      .moveTaskInArray(
        this._category.catId,
        event.previousContainer.id,
        event.container.id,
        event.previousIndex,
        event.currentIndex
      )
      .subscribe((resp) => {
        this.taskUpdateOperation.emit(true);
      });
  }

  addTask(status: string) {
    const config = {
      isEdit: false,
      status,
      taskData: null,
    } as TaskDialogConfig;
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: config,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result && result.data) {
        const task = result.data as Task;
        task.category = this.category;
        this.saveTask(task);
      }
    });
  }

  private saveTask(task: Task) {
    this.dataService.saveTask(task).subscribe((resp: any) => {
      if (resp.status === 200) {
        this.pushTaskByStatus(task);
        this.taskUpdateOperation.emit(true);
        this.snackBar.open('Task Saved Successfully', 'close', {
          duration: 2000,
        });
      }
    });
  }

  editTask(task: Task) {
    const config = {
      isEdit: true,
      status,
      taskData: task,
    } as TaskDialogConfig;
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: config,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result && result.data) {
        task = { ...task, ...result.data };
        this.updateTask(result.data);
      }
    });
  }

  private updateTask(task: Task) {
    this.dataService.updateTask(task).subscribe((resp: any) => {
      if (resp.status === 200) {
        this.updateTaskById(task);
        this.taskUpdateOperation.emit(true);
        this.snackBar.open('Task Updated Successfully', 'close', {
          duration: 2000,
        });
      }
    });
  }

  private updateTaskById(task: Task) {
    const list =
      task.status === 'TODO'
        ? this.todo
        : task.status === 'IP'
        ? this.inProgress
        : this.done;
    const tIndex = list.findIndex((t) => t.id === task.id);
    if (tIndex > -1) {
      list[tIndex] = task;
    }
  }

  setBookmark(event: any, task: Task) {
    this.dataService
      .setBookMark(event, task.category.catId, task.id, task.status)
      .subscribe((resp: any) => {
        if (resp.status === 200) {
          this.taskUpdateOperation.emit(true);
          const msg =
            'Task' +
            ' ' +
            (event ? 'Marked' : 'Unmarked') +
            ' ' +
            'Successfully';
          this.snackBar.open(msg, 'close', {
            duration: 2000,
          });
        }
      });
  }
}
