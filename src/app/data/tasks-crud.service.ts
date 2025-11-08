import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TaskItem } from '../shared/models/task.interface';
import { Observable, tap } from 'rxjs';
import { TasksStateService } from '../core/services/tasks-state.service';

@Injectable({
  providedIn: 'root'
})
export class TasksCrudService {
  private apiUrl = '/api/tasks';
  private tasksStateService = inject(TasksStateService);
  private http = inject(HttpClient);

  getTasks(): Observable<TaskItem[]> {
    return this.http.get<TaskItem[]>(this.apiUrl).pipe(
      tap(tasks => this.tasksStateService.setTasks(tasks))
    );
  }

  addTask(task: TaskItem): Observable<TaskItem> {
    return this.http.post<TaskItem>(this.apiUrl, task).pipe(
      tap(savedTask => this.tasksStateService.addTask(savedTask))
    );
  }

  updateTask(task: TaskItem): Observable<TaskItem> {
    return this.http.put<TaskItem>(this.apiUrl, task).pipe(
      tap(() => this.tasksStateService.updateTask(task))
    );
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.tasksStateService.deleteTask(id))
    );
  }

}