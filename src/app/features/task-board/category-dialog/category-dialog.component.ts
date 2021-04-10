import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColorEvent } from 'ngx-color';
import { CategoryDialogConfig } from '../task.interfaces';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.css'],
})
export class CategoryDialogComponent implements OnInit {
  dialogData: CategoryDialogConfig;
  categoryForm: FormGroup;
  colorState: string;
  colors = [
    '#f44336',
    '#e91e63',
    '#9c27b0',
    '#673ab7',
    '#3f51b5',
    '#2196f3',
    '#03a9f4',
    '#00bcd4',
    '#009688',
    '#4caf50',
    '#8bc34a',
    '#cddc39',
    '#ffeb3b',
    '#ffc107',
    '#ff9800',
    '#ff5722',
    '#795548',
    '#607d8b',
  ];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CategoryDialogConfig,
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<CategoryDialogComponent>
  ) {
    this.dialogData = Object.assign({});
  }

  ngOnInit(): void {
    this.creatFormGroup();
    if (this.data) {
      this.dialogData = this.data;
      if (!this.dialogData.isEdit) {
        this.colorState = this.colors[0];
        this.categoryForm.get('catColor').setValue(this.colors[0]);
      }
    }
  }

  private creatFormGroup() {
    this.categoryForm = this.fb.group({
      catId: '',
      catName: ['', Validators.required],
      catColor: ['', [Validators.required]],
      catTaskCount: 0,
    });
  }

  colorChangeHandler(event: ColorEvent) {
    this.categoryForm.get('catColor').setValue(event.color.hex);
  }

  addCategory() {
    this.categoryForm.get('catId').setValue(Date.now().toString());
    this.matDialogRef.close({data: this.categoryForm.value})
  }

  close() {
    this.matDialogRef.close();
  }
}
