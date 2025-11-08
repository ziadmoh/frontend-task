import { Component , inject} from '@angular/core';
import { Navbar } from "./layout/navbar/navbar";
import { Sidebar } from "./layout/sidebar/sidebar";
import { RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';
import { SidebarService } from './core/services/sidebar.service';
import { Overlay } from './layout/overlay/overlay';
@Component({
  selector: 'app-root',
  imports: [ Navbar, Sidebar, RouterOutlet,NgClass,Overlay],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  sidebarService = inject(SidebarService);

}
