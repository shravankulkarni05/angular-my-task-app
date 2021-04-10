import { Component, OnInit } from '@angular/core';
import { ThemeSwitcherService } from 'src/app/core/theme-switcher.service';

@Component({
  selector: 'app-task-board-header',
  templateUrl: './task-board-header.component.html',
  styleUrls: ['./task-board-header.component.css'],
})
export class TaskBoardHeaderComponent implements OnInit {
  isDarkMode: boolean;
  constructor(private themeService: ThemeSwitcherService) {}

  ngOnInit(): void {
    this.isDarkMode = this.themeService.themeSwitchSubject.value
  }

  switchTheme(event: any) {
    this.isDarkMode = event.checked;
    this.themeService.switchAppTheme(event.checked);
  }
}
