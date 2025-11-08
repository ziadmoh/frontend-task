import { Component, OnInit, inject, effect, computed } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { TasksCrudService } from '../../data/tasks-crud.service';
import { TasksStateService } from '../../core/services/tasks-state.service';
import { TaskItem, TaskStatus } from '../../shared/models/task.interface';

@Component({
  selector: 'app-dashboard',
  imports: [ChartModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {

  constructor() {
    effect(() => {
      if (this.tasks().length > 0 || this.statusChartData) {
        this.updateCharts();
      }
    });
  }



  private tasksCrudService = inject(TasksCrudService);
  private tasksStateService = inject(TasksStateService);
  
  tasks = this.tasksStateService.tasks;

  activeTasks = computed(() => this.tasks().filter((t: TaskItem) => t.status === TaskStatus.Active));
  closedTasks = computed(() => this.tasks().filter((t: TaskItem) => t.status === TaskStatus.Closed));

  // Chart data
  statusChartData: any;
  categoryChartData: any;
  timelineChartData: any;
  
  // Chart options
  pieChartOptions: any;
  lineChartOptions: any;

  ngOnInit(): void {
    // Load tasks 
    if (this.tasks().length === 0) {
      this.tasksCrudService.getTasks().subscribe();
    }
    
    
  }

  updateCharts(): void {
    const tasks = this.tasks();
    
    // Pie Chart
    const statusCounts = this.countByStatus(tasks);
    this.statusChartData = {
      labels: ['New', 'Active', 'Closed'],
      datasets: [{
        data: [statusCounts.New, statusCounts.Active, statusCounts.Closed],
        backgroundColor: ['#3641F5', '#7592FF', '#DDE9FF']
      }]
    };

    // Donut Chart
    const categoryCounts = this.countByCategory(tasks);
    this.categoryChartData = {
      labels: ['Dev', 'Test', 'UI', 'Db'],
      datasets: [{
        data: [categoryCounts.Dev, categoryCounts.Test, categoryCounts.UI, categoryCounts.Db],
        backgroundColor: ['#40A737', '#18B0FF', '#FF2473', '#FF9C1C']
      }]
    };

    // Line Chart
    const timelineData = this.getTimelineData(tasks);
    this.timelineChartData = {
      labels: timelineData.labels,
      datasets: [{
        label: 'Tasks Created',
        data: timelineData.data,
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4
      }]
    };

    // Chart options
    this.pieChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 15,
            font: {
              family: 'Poppins',
              size: 12
            }
          }
        }
      }
    };

    this.lineChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            font: {
              family: 'Poppins'
            }
          }
        },
        x: {
          ticks: {
            font: {
              family: 'Poppins'
            }
          }
        }
      }
    };

   
  }

  private countByStatus(tasks: TaskItem[]): { New: number; Active: number; Closed: number } {
    return tasks.reduce((acc, task) => {
      acc[task.status as keyof typeof acc]++;
      return acc;
    }, { New: 0, Active: 0, Closed: 0 });
  }

  private countByCategory(tasks: TaskItem[]): { Dev: number; Test: number; UI: number; Db: number } {
    return tasks.reduce((acc, task) => {
      acc[task.category as keyof typeof acc]++;
      return acc;
    }, { Dev: 0, Test: 0, UI: 0, Db: 0 });
  }

  private getTimelineData(tasks: TaskItem[]): { labels: string[]; data: number[] } {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });

    const counts = new Array(7).fill(0);
    tasks.forEach(task => {
      if (task.dueDate) {
        const taskDate = new Date(task.dueDate);
        const daysAgo = Math.floor((Date.now() - taskDate.getTime()) / (1000 * 60 * 60 * 24));
        if (daysAgo >= 0 && daysAgo < 7) {
          counts[6 - daysAgo]++;
        }
      }
    });

    return { labels: last7Days, data: counts };
  }
}