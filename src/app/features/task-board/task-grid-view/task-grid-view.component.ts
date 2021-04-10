import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DummyDataService } from 'src/app/core/dummy-data.service';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { Task, TaskDialogConfig } from '../task.interfaces';

@Component({
  selector: 'app-task-grid-view',
  templateUrl: './task-grid-view.component.html',
  styleUrls: ['./task-grid-view.component.css'],
})
export class TaskGridViewComponent implements OnInit {
  @Input() taskList: Task[] = [];
  @Input() priorities: any[];
  @Output() taskUpdateOperation = new EventEmitter<boolean>();
  constructor(private dataService: DummyDataService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {}

  ngOnInit(): void {}
  
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
        task = result.data;
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
    const tIndex = this.taskList.findIndex(t => t.id === task.id);
    if (tIndex > -1) {
      this.taskList[tIndex] = task;
    }
  }

  setBookmark(event: any, task: Task) {
    this.dataService.setBookMark(event, task.category.catId, task.id, task.status).subscribe((resp: any) => {
      if (resp.status === 200) {
        const msg =
          'Task' + ' ' + (event ? 'Marked' : 'Unmarked') + ' ' + 'Successfully';
        this.snackBar.open(msg, 'close', {
          duration: 2000,
        });
      }
    });
  }
}
