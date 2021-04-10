import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DummyDataService } from 'src/app/core/dummy-data.service';
import { CategoryDialogComponent } from '../category-dialog/category-dialog.component';
import { CategoryDialogConfig, Task, TaskCategory, TaskData } from '../task.interfaces';

@Component({
  selector: 'app-task-dashboard',
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.css'],
})
export class TaskDashboardComponent implements OnInit {
  appName = 'My Task';
  selCategory: TaskCategory;
  taskCategores: TaskCategory[] = [];
  allTasks: Task[] = [];
  taskDataList: TaskData[] = [];
  taskDataMap: any = {};
  priorities: any[] = [];

  constructor(
    private dataService: DummyDataService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getPriorities();
    this.getTaskCategories();
    this.getTasks();
  }

  private getTaskCategories() {
    this.dataService.getTaskCategories().subscribe((resp: any) => {
      if (resp.status === 200) {
        this.taskCategores = resp.data;
        if (!this.selCategory) {
          this.selCategory = Object.assign({}, this.taskCategores[0]);
        }
      }
    });
  }

  private getTasks() {
    this.dataService.getTasks().subscribe((resp: any) => {
      if (resp.status === 200) {
        this.taskDataList = resp.data;
        const taskMap = {}
        let allTasks = [];
        this.taskDataList.forEach(t => {
         taskMap[t.catId] = t;
          allTasks = [...allTasks, ...t.todo, ...t.inProgress, ...t.done];
        });
        this.taskDataMap = taskMap;
        this.allTasks = allTasks;
      }
    })
  }

  private getPriorities() {
    this.dataService.getPriorities().subscribe(resp => this.priorities = resp.data);
  }

  addCategory() {
    const config = {
      isEdit: false,
      catData: null,
    } as CategoryDialogConfig;
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '500px',
      data: config,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result && result.data) {
        this.saveCategory(result.data);
      }
    });
  }

  private saveCategory(category: TaskCategory) {
    this.dataService.addCategory(category).subscribe((resp: any) => {
      if (resp.status === 200) {
        this.taskCategores.push(category);
        this.snackBar.open('Category Saved Successfully', 'close', {
          duration: 2000,
        });
      }
    });
  }

  refreshTaskList() {
    this.getTaskCategories();
    this.getTasks();
  }
}

export const TASK_LIST: Task[] = [
  {
    id: '11234543',
    name: 'Finalize the the sales plan for new product marketing - 1',
    desc: '',
    prty: 'LOW',
    date: '',
    category: {
      catId: 'SALES',
      catName: 'Sales',
      catColor: '#254fa2',
      catTaskCount: 2,
    },
    status: 'TODO',
    // comments: [],
    // attachments: [],
    bookmark: false,
  },
];
