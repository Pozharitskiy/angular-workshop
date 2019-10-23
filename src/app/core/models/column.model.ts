import { Task } from './task.model';

export interface Column {
  _id: string;
  tasks: Task[];
  title: string;
  updatedAt: string;
  createdAt: string;
}
