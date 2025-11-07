import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { SidebarService } from '../shared/sidebar';
@Component({
  selector: 'app-sidebar',
  imports: [ NgClass],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  
  constructor(public sidebarService: SidebarService) { }
}
