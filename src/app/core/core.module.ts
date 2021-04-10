import { NgModule } from '@angular/core';
import { DummyDataService } from './dummy-data.service';
import { ThemeSwitcherService } from './theme-switcher.service';

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: [ThemeSwitcherService, DummyDataService]
})
export class CoreModule {}
