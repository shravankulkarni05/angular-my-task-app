import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeSwitcherService } from './core/theme-switcher.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  value = 'World';
  sub$: Subscription;
  @HostBinding('class') componentCssClass;

  constructor(
    public overlayContainer: OverlayContainer,
    private themeService: ThemeSwitcherService
  ) {}

  ngOnInit(): void {
    this.subscribeToThemeChange();
  }

  subscribeToThemeChange() {
    this.sub$ = this.themeService.switchThemeObs$.subscribe((val) => {
      const overlay = this.overlayContainer.getContainerElement();
      if (val) {
        overlay.classList.add('unicorn-dark-theme');
        this.componentCssClass = 'unicorn-dark-theme';
      } else {
        overlay.classList.remove('unicorn-dark-theme');
        this.componentCssClass = '';
      }
    });
  }

  ngOnDestroy(): void {
    if (this.sub$) {
      this.sub$.unsubscribe();
    }
  }
}
