import { Component , input,signal} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { TaskItem } from '../shared/task.interface';


@Component({
  selector: 'app-task',
  imports: [ ButtonModule, TagModule, MenuModule],
  templateUrl: './task.html',
  styleUrl: './task.scss',
})
export class Task {
  task = input.required<TaskItem>();

  items: MenuItem[] = [
    { label: 'Edit', icon: 'pi pi-home', routerLink: '/' },
    { label: 'Delete', icon: 'pi pi-list', routerLink: '/tasks' },
  ];
}
