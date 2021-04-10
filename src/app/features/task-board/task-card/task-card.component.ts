import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../task.interfaces';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css'],
})
export class TaskCardComponent implements OnInit {
  @Input() task: Task;
  @Input() showHeader: boolean;
  @Input() priorities: any[];
  @Output() clicked = new EventEmitter<boolean>();
  @Output() bookmarkclicked = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {}

  editTask() {
    this.clicked.emit(true);
  }

  setBookmark(event: any) {
    event.stopPropagation();
    this.task.bookmark = !this.task.bookmark;
    this.bookmarkclicked.emit(this.task.bookmark);
  }
}
