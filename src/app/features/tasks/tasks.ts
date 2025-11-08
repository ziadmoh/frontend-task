import { Component, OnInit, computed, inject } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { Task } from '../task/task';
import { TaskItem, TaskStatus } from '../../shared/models/task.interface';
import { TasksCrudService } from '../../data/tasks-crud.service';
import { TasksStateService } from '../../core/services/tasks-state.service';
import { Dialog } from 'primeng/dialog';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { TaskCategory } from '../../shared/models/task.interface';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { StyleClassModule } from 'primeng/styleclass';
import { FloatLabelModule } from 'primeng/floatlabel';
@Component({
  selector: 'app-tasks',
  imports: [ StyleClassModule, FloatLabelModule, ButtonModule, TagModule, Task,Dialog,ReactiveFormsModule, TextareaModule, DatePickerModule, InputNumberModule, SelectModule, ToastModule, ConfirmDialogModule ],
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss',
  providers: [MessageService]
})
export class Tasks implements OnInit {

  private tasksCrudService = inject(TasksCrudService);
  private tasksStateService = inject(TasksStateService);
  private messageService = inject(MessageService);
  
  categories  = [
    { name: 'Dev', value: TaskCategory.Dev },
    { name: 'Test', value: TaskCategory.Test },
    { name: 'UI', value: TaskCategory.UI },
    { name: 'Db', value: TaskCategory.Db }
  ];
  statuses = [
    { name: 'New', value: TaskStatus.New },
    { name: 'Active', value: TaskStatus.Active },
    { name: 'Closed', value: TaskStatus.Closed }
  ];
  visible: boolean = false;
  dialogHeader: string = 'Add Task';

  showDialog() {
    this.taskForm.reset();
    this.dialogHeader = 'Add Task';
      this.visible = true;
    this.taskForm.updateValueAndValidity();
  }

  tasks = this.tasksStateService.tasks;

  newTasks = computed(() => this.tasks().filter((t: TaskItem) => t.status === TaskStatus.New));
  activeTasks = computed(() => this.tasks().filter((t: TaskItem) => t.status === TaskStatus.Active));
  closedTasks = computed(() => this.tasks().filter((t: TaskItem) => t.status === TaskStatus.Closed));

  ngOnInit(): void {
    this.tasksCrudService.getTasks().subscribe();
  }

  taskForm = new FormGroup({
    id: new FormControl(null),
    title: new FormControl('', [Validators.required,Validators.minLength(3)]),
    description: new FormControl('', [Validators.required]),
    assignedTo: new FormControl('', [Validators.required]),
    dueDate: new FormControl<Date | null>(null, [Validators.required]),
    estimatedHours: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
  });


  handleTaskAction() {
    if (!this.taskForm.valid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all required fields.' });
      return;
    }


    const formValue = this.taskForm.value;
    const newTask: TaskItem = {
      ...formValue,
      status: (formValue.status as any)?.value || formValue.status,
      category: (formValue.category as any)?.value || formValue.category,
      dueDate: formValue.dueDate instanceof Date 
        ? formValue.dueDate 
        : formValue.dueDate 
          ? new Date(formValue.dueDate as string | Date)
          : new Date()
    } as unknown as TaskItem;

   
    if (this.dialogHeader === 'Add Task') {
      this.tasksCrudService.addTask(newTask).subscribe({
      next: () => {
        this.visible = false;
        this.taskForm.reset();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Task added successfully!' });
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Could not save task.' });
        console.error('Error saving task:', err);
      }
    });
    } else {
      this.tasksCrudService.updateTask(newTask).subscribe({
        next: () => {
          this.visible = false;
          this.taskForm.reset();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Task updated successfully!' });
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Could not update task.' });
          console.error('Error updating task:', err);
        }
      });
    }
  }

 
  cancel() {
    this.visible = false;
  } 


  handleTaskDeletion(deletedTaskId: number) {
    this.tasksCrudService.deleteTask(deletedTaskId).subscribe();
  }
  handleTaskEdit(editedTask: TaskItem) { 
    // Convert dueDate to Date object if it's a string
    const dueDate = editedTask.dueDate instanceof Date 
      ? editedTask.dueDate 
      : new Date(editedTask.dueDate);
    
    this.taskForm.patchValue({
      ...editedTask,
      id: editedTask.id ?? null,
      dueDate: dueDate
    } as any);
    this.dialogHeader = 'Edit Task';
    this.visible = true;
    this.taskForm.updateValueAndValidity();
  }


}
