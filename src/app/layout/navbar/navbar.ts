import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SidebarService } from '../../core/services/sidebar.service';

@Component({
  selector: 'app-navbar',
  imports: [ NgClass],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {

  sidebarService = inject(SidebarService);
  handleToggle() {
    this.sidebarService.toggleMobileOpen();
  }

}
