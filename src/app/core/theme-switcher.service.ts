import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ThemeSwitcherService {
  themeSwitchSubject = new BehaviorSubject(false);
  switchThemeObs$ = this.themeSwitchSubject.asObservable();
  constructor() { }

  switchAppTheme(val: boolean) {
    this.themeSwitchSubject.next(val);
  }
}
