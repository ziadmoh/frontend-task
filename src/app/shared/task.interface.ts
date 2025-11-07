export interface TaskItem {
    id: string;
    title: string;
    description: string;
    assignedTo: string;
    status: string;
    dueDate: Date;
    estimatedHours: number;
    category: string;
  }
  