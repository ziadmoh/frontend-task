import { InMemoryDbService } from 'angular-in-memory-web-api';
import { TaskCategory, TaskItem, TaskStatus } from '../shared/models/task.interface';

export class InmemoryTestData implements InMemoryDbService {
  createDb() {
    let tasks:TaskItem[] =  [
      {
        id: 1,
        title: 'Fix login issue',
        description: 'Users are unable to login with valid credentials.',
        assignedTo: 'Ziad Yahya',
        status: TaskStatus.New,
        dueDate: new Date('2025-11-10T12:00:00'),
        estimatedHours: 3,
        category: TaskCategory.Test
      },
      {
        id: 2,
        title: 'Implement payment gateway',
        description: 'Integrate Stripe API for subscription payments.',
        assignedTo: 'Mohamed Samir',
        status: TaskStatus.Active,
        dueDate: new Date('2025-11-15T17:00:00'),
        estimatedHours: 8,
        category: TaskCategory.Dev
      },
      {
        id: 3,
        title: 'Design homepage',
        description: 'Create a responsive design for the homepage using Figma.',
        assignedTo: 'Sara Ahmed',
        status: TaskStatus.Closed,
        dueDate: new Date('2025-11-05T09:00:00'),
        estimatedHours: 5,
        category: TaskCategory.UI
      },
      {
        id: 4,
        title: 'Database schema update',
        description: 'Add new tables for the reporting module.',
        assignedTo: 'Ahmed Belal',
        status: TaskStatus.New,
        dueDate: new Date('2025-11-20T15:00:00'),
        estimatedHours: 4,
        category: TaskCategory.Db
      },
      {
        id: 5,
        title: 'Write unit tests',
        description: 'Cover all service functions with Jasmine tests.',
        assignedTo: 'Laila Hassan',
        status: TaskStatus.Active,
        dueDate: new Date('2025-11-12T11:00:00'),
        estimatedHours: 6,
        category: TaskCategory.Test
      },
      {
        id: 6,
        title: 'Create dashboard UI',
        description: 'Develop dashboard components in Angular.',
        assignedTo: 'Mohamed Mohasen',
        status: TaskStatus.New,
        dueDate: new Date('2025-11-18T10:00:00'),
        estimatedHours: 7,
        category: TaskCategory.UI
      }
    ];
    return { tasks: tasks};
  }
} 