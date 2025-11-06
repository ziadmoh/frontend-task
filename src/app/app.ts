import { Component, signal } from '@angular/core';
import { Navbar } from "./navbar/navbar";
import { Sidebar } from "./sidebar/sidebar";
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [ Navbar, Sidebar, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('task-management');
}
