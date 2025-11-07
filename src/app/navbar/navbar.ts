import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarService } from '../shared/sidebar';

@Component({
  selector: 'app-navbar',
  imports: [ NgClass],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {


  constructor(public sidebarService: SidebarService) { }

  handleToggle() {
    this.sidebarService.toggleMobileOpen();
  }

}
