import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskKanbanViewComponent } from './task-kanban-view.component';

describe('TaskKanbanViewComponent', () => {
  let component: TaskKanbanViewComponent;
  let fixture: ComponentFixture<TaskKanbanViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskKanbanViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskKanbanViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
