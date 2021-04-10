import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './shared/angular-material/angular-material.module';
import { OverlayModule } from '@angular/cdk/overlay';
import { TaskBoardModule } from './features/task-board/task-board.module';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    OverlayModule,
    AppRoutingModule,
    CoreModule,
    TaskBoardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
