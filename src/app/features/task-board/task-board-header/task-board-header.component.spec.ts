import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskBoardHeaderComponent } from './task-board-header.component';

describe('TaskBoardHeaderComponent', () => {
  let component: TaskBoardHeaderComponent;
  let fixture: ComponentFixture<TaskBoardHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskBoardHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskBoardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
