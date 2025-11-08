import { Injectable, signal } from '@angular/core';
import { TaskItem } from '../../shared/models/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TasksStateService {
  private _tasks = signal<TaskItem[]>([]);
  
  // will be read from the components
  tasks = this._tasks.asReadonly();

  setTasks(tasks: TaskItem[]): void {
    this._tasks.set(tasks);
  }

  addTask(task: TaskItem): void {
    this._tasks.update(tasks => [...tasks, task]);
  }

  updateTask(updatedTask: TaskItem): void {
    this._tasks.update(tasks => 
      tasks.map(t => t.id === updatedTask.id ? updatedTask : t)
    );
  }

  deleteTask(taskId: number): void {
    this._tasks.update(tasks => tasks.filter(t => t.id !== taskId));
  }
}