import { Component , input,computed, inject, output} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { MenuModule } from 'primeng/menu';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { TaskCategory, TaskItem } from '../../shared/models/task.interface';
import { TasksCrudService } from '../../data/tasks-crud.service';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AssigneeNamePipe } from '../../shared/pipes/assignee-name.pipe';
import { NgClass } from '@angular/common';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-task',
  imports: [ ButtonModule, TagModule, MenuModule, ToastModule, ConfirmDialogModule, NgClass, AssigneeNamePipe, DatePipe],
  templateUrl: './task.html',
  styleUrl: './task.scss',
  providers: [ConfirmationService]
})
export class Task {
  private tasksCrudService = inject(TasksCrudService);
  private confirmationService = inject(ConfirmationService);



  task = input.required<TaskItem>();
  taskDeletion = output<number>();
  taskEdit = output<TaskItem>();

  items: MenuItem[] = [
    { label: 'Edit', icon: 'pi pi-pencil', command: () => this.editTask() },
    { label: 'Delete', icon: 'pi pi-trash', command: () => this.deleteTask() },
  ];

  taskSeverity = computed(() => {
    switch (this.task().category) {
      case TaskCategory.Dev:
        return '#40A737';
      case TaskCategory.Test:
        return '#18B0FF';
      case TaskCategory.UI:
        return '#FF2473';
      case TaskCategory.Db:
        return '#ff9c1c';
      default:
        return '#40A737';
    }
  });

  deleteTask() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this task?',
      header: 'Delete Task',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'px-6 py-2.5 rounded-lg font-medium transition-all duration-200 hover:shadow-md',
      rejectButtonStyleClass: 'px-6 py-2.5 rounded-lg font-medium transition-all duration-200 hover:shadow-md',
      acceptLabel: 'Delete',
      rejectLabel: 'Cancel',
      acceptIcon: 'pi pi-trash',
      rejectIcon: 'pi pi-times',
      defaultFocus: 'reject',
      accept: () => {
        this.tasksCrudService.deleteTask(this.task().id as number).subscribe(() => {
          
          this.taskDeletion.emit(this.task().id as number);
        });
      }
    });
  }

  editTask() {
    this.taskEdit.emit(this.task());
  }


}
