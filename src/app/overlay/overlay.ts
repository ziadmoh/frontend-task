import { Component } from '@angular/core';
import { SidebarService } from '../shared/sidebar';
@Component({
  selector: 'app-overlay',
  imports: [],
  templateUrl: './overlay.html',
  styleUrl: './overlay.scss',
})
export class Overlay {

  constructor(public sidebarService: SidebarService) { }
}
