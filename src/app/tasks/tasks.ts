import { Component,signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { Task } from '../task/task';
import { TaskItem } from '../shared/task.interface';
@Component({
  selector: 'app-tasks',
  imports: [ ButtonModule, TagModule, Task],
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss',
})
export class Tasks {
  tasks = signal<TaskItem[]>([]);
  constructor() {
    this.tasks.set([
      { id: '1', title: 'Task 1', description: 'Description 1', assignedTo: 'John Doe', status: 'New', dueDate: new Date(), estimatedHours: 1, category: 'Category 1' },
      { id: '2', title: 'Task 2', description: 'Description 2', assignedTo: 'Jane Doe', status: 'Active', dueDate: new Date(), estimatedHours: 2, category: 'Category 2' },
    ]);
  }
}
