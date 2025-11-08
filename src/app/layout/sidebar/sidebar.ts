import { Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { SidebarService } from '../../core/services/sidebar.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  imports: [NgClass, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
    sidebarService = inject(SidebarService);
}
