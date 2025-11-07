import { Component, signal } from '@angular/core';
import { Navbar } from "./navbar/navbar";
import { Sidebar } from "./sidebar/sidebar";
import { RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';
import { SidebarService } from './shared/sidebar';
import { Overlay } from './overlay/overlay';
@Component({
  selector: 'app-root',
  imports: [ Navbar, Sidebar, RouterOutlet,NgClass,Overlay],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('task-management');
  constructor(public sidebarService: SidebarService) { }
}
