import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import {
  Task,
  TaskCategory,
  TaskData,
} from '../features/task-board/task.interfaces';

@Injectable()
export class DummyDataService {
  totalTaskCount: number = 0;
  taskCategories: TaskCategory[] = [
    {
      catId: 'ALL',
      catName: 'All Tasks',
      catColor: '#0f2449',
      catTaskCount: 0,
    },
  ];
  tasks: TaskData[] = [];
  priorities: any[] = [
    { id: 'HI', name: 'High', icon: 'arrow_upward', color: '#f44336' },
    { id: 'MD', name: 'Medium', icon: 'drag_handle', color: '#ff9800' },
    { id: 'LW', name: 'Low', icon: 'arrow_downward', color: '#00bcd4' },
  ];

  localStorageKeys = {
    cats: 'CATGS',
    tasks: 'TASKS',
    taskCount: 'TASK_COUNT',
  };

  constructor() {
    // localStorage.clear();
    this.initData();
  }

  private initData() {
    this.taskCategories = this.getDataFromLocalStorage(this.localStorageKeys.cats) || this.taskCategories;
    this.tasks = this.getDataFromLocalStorage(this.localStorageKeys.tasks) || this.tasks;
    this.totalTaskCount = this.getDataFromLocalStorage(this.localStorageKeys.taskCount) || 0;
  }

  private getDataFromLocalStorage(key: string) {
    const data = localStorage.getItem(key);
    return JSON.parse(data);
  }

  private setDataInLocalStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getTaskCategories() {
    const localCats = this.getDataFromLocalStorage(this.localStorageKeys.cats);
    return this.getSuccessResponse(localCats || this.taskCategories);
  }

  getTasks() {
    const localTasks = this.getDataFromLocalStorage(
      this.localStorageKeys.tasks
    );
    return this.getSuccessResponse(localTasks || this.tasks);
  }

  addCategory(newCat: TaskCategory) {
    this.taskCategories.push(Object.assign({}, newCat));
    this.setDataInLocalStorage(this.localStorageKeys.cats, this.taskCategories);
    return this.getSuccessResponse(null);
  }

  getPriorities() {
    return this.getSuccessResponse(this.priorities);
  }

  saveTask(task: Task) {
    const catIndex = this.tasks.findIndex(
      (t) => t.catId === task.category.catId
    );
    if (catIndex === -1) {
      const newTaskData = this.getNewTaskDataObject();
      newTaskData.catId = task.category.catId;
      this.pushTaskByStatus(task, newTaskData);
      this.tasks.push(newTaskData);
    } else {
      this.pushTaskByStatus(task, this.tasks[catIndex]);
    }
    this.setDataInLocalStorage(this.localStorageKeys.tasks, this.tasks);
    this.updateCategoryTaskCount(task);
    return this.getSuccessResponse(null);
  }

  private pushTaskByStatus(task: Task, taskData: TaskData) {
    if (task.status === 'TODO') {
      taskData.todo.push(task);
    } else if (task.status === 'C') {
      taskData.done.push(task);
    } else if (task.status === 'IP') {
      taskData.inProgress.push(task);
    }
  }

  private getNewTaskDataObject(): TaskData {
    const newTaskData = {} as TaskData;
    newTaskData.catId = '';
    newTaskData.todo = [];
    newTaskData.inProgress = [];
    newTaskData.done = [];
    return newTaskData;
  }

  private updateCategoryTaskCount(task: Task) {
    const categoryIndex = this.taskCategories.findIndex(
      (c) => c.catId === task.category.catId
    );
    if (categoryIndex > -1) {
      this.taskCategories[categoryIndex].catTaskCount =
        this.taskCategories[categoryIndex].catTaskCount + 1;
      this.totalTaskCount = this.totalTaskCount + 1;
      this.taskCategories[0].catTaskCount = this.totalTaskCount;
      this.setDataInLocalStorage(
        this.localStorageKeys.cats,
        this.taskCategories
      );
      this.setDataInLocalStorage(
        this.localStorageKeys.taskCount,
        this.totalTaskCount
      );
    }
  }

  updateTask(task: Task) {
    const catIndex = this.tasks.findIndex(
      (t) => t.catId === task.category.catId
    );
    if (catIndex > -1) {
      const tasks = this.getTaskListByStatus(task.status, this.tasks[catIndex]);
      const taskIndex = tasks.findIndex((t) => t.id === task.id);
      if (taskIndex > -1) {
        tasks[taskIndex] = task;
        this.setDataInLocalStorage(this.localStorageKeys.tasks, this.tasks);
        return this.getSuccessResponse(null);
      }
    }
  }

  private getTaskListByStatus(status: string, taskData: TaskData) {
    return status === 'TODO'
      ? taskData.todo
      : status === 'IP'
      ? taskData.inProgress
      : taskData.done;
  }

  setBookMark(bkValue: boolean, catId: string, taskId: string, status: string) {
    const catIndex = this.tasks.findIndex((t) => t.catId === catId);
    if (catIndex > -1) {
      const tasks = this.getTaskListByStatus(status, this.tasks[catIndex]);
      const taskIndex = tasks.findIndex((t) => t.id === taskId);
      tasks[taskIndex].bookmark = bkValue;
      this.setDataInLocalStorage(this.localStorageKeys.tasks, this.tasks);
      return this.getSuccessResponse(null);
    }
  }

  moveTaskInArray(
    catId: string,
    prevStatus: string,
    currStatus: string,
    prevIndex: number,
    currIndex: number
  ) {
    const catIndex = this.tasks.findIndex((t) => t.catId === catId);
    if (catIndex > -1) {
      const prevTasksContainer = this.getTaskListByStatus(
        prevStatus,
        this.tasks[catIndex]
      );
      if (prevStatus === currStatus) {
        moveItemInArray(prevTasksContainer, prevIndex, currIndex);
      } else {
        const currTaskContainer = this.getTaskListByStatus(
          currStatus,
          this.tasks[catIndex]
        );
        transferArrayItem(
          prevTasksContainer,
          currTaskContainer,
          prevIndex,
          currIndex
        );
        currTaskContainer[currIndex].status = currStatus;
      }
      this.setDataInLocalStorage(this.localStorageKeys.tasks, this.tasks);
      return this.getSuccessResponse(null);
    }
  }

  private getSuccessResponse(respData: any) {
    const parsedData = respData
      ? JSON.parse(JSON.stringify(respData))
      : respData;
    return of({ status: 200, data: parsedData });
  }
}
