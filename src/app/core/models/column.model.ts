import { Task } from './task.model';

export interface Column {
  tasks: Task[];
  _id: string;
  title: string;
  updatedAt: string;
  createdAt: string;
}
