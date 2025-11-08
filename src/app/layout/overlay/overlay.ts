import { Component,inject } from '@angular/core';
import { SidebarService } from '../../core/services/sidebar.service';
@Component({
  selector: 'app-overlay',
  imports: [],
  templateUrl: './overlay.html',
  styleUrl: './overlay.scss',
})
export class Overlay {
  sidebarService = inject(SidebarService);
}
