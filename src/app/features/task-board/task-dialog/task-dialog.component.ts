import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DummyDataService } from 'src/app/core/dummy-data.service';
import { TaskDialogConfig } from '../task.interfaces';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css'],
  providers: [ DatePipe ]
})
export class TaskDialogComponent implements OnInit {
  taskForm: FormGroup;
  dialogData: TaskDialogConfig;
  priorities: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogConfig,
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<TaskDialogComponent>,
    private dataService: DummyDataService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getPriorities();
    this.creatFormGroup();
    if (this.data) {
      this.dialogData = this.data;
      this.setFormValues();
    }
  }

  private creatFormGroup() {
    this.taskForm = this.fb.group({
      id: '',
      name: ['', [Validators.required]],
      desc: '',
      prty: ['', [Validators.required]],
      date: ['', [Validators.required]],
      category: {},
      status: '',
      comments: [],
      attachments: [],
      bookmark: false
    });
  }

  setFormValues() {
    if (this.dialogData.isEdit) {
      this.taskForm.patchValue(this.dialogData.taskData);
      const prty = this.priorities.find(p => p.id === this.dialogData.taskData.prty);
      this.taskForm.get('prty').setValue(prty);
      const dateParts = this.dialogData.taskData.date.split('/');
      this.taskForm.get('date').setValue(new Date(parseInt(dateParts[2], 10), (parseInt(dateParts[1], 10) - 1), parseInt(dateParts[0], 10)));
    }
  }

  getPriorities() {
    this.dataService.getPriorities().subscribe(resp => this.priorities = resp.data);
  }

  addTask() {
    const values = this.taskForm.value;
    values.prty = values.prty.id;
    values.date = this.datePipe.transform(values.date, 'dd/MM/yyyy')
    if (!this.dialogData.isEdit) {
      values.id = Date.now().toString();
      values.status = this.dialogData.status;
    }
    this.matDialogRef.close({ data: values });
  }

  close() {
    this.matDialogRef.close();
  }
}
