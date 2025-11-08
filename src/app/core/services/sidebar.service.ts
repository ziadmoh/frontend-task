import { Injectable, signal } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  isOpen$ = signal<boolean>(true);

  toggleMobileOpen() {
    this.isOpen$.set(!this.isOpen$());
  }


}
