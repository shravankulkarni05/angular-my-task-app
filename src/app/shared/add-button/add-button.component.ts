import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.css'],
})
export class AddButtonComponent implements OnInit {
  @Input() classes?: string[] = [];
  @Input() placeholder?: string;
  @Output() clicked = new EventEmitter<boolean>();
  containerHovered: boolean;

  constructor() {}

  ngOnInit(): void {}

  addNew() {
    this.clicked.emit(true);
  }

  mouseEnter() {
    if (!this.placeholder) {
      return;
    }
    this.containerHovered = true;
  }

  mouseLeave() {
    if (!this.placeholder) {
      return;
    }
    this.containerHovered = false;
  }
}
