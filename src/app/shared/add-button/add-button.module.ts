import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddButtonComponent } from './add-button.component';



@NgModule({
  declarations: [AddButtonComponent],
  imports: [
    CommonModule
  ],
  exports:[AddButtonComponent]
})
export class AddButtonModule { }
