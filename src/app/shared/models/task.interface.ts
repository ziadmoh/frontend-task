export interface TaskItem {
    id?: number;
    title: string;
    description: string;
    assignedTo: string;
    status: TaskStatus;
    dueDate: Date | string;
    estimatedHours: number;
    category: TaskCategory;
}

export enum TaskStatus {
    New = 'New',
    Active = 'Active',
    Closed = 'Closed'
}

export enum TaskCategory {
    Dev = 'Dev',
    Test = 'Test',
    UI = 'UI',
    Db = 'Db'
}
  