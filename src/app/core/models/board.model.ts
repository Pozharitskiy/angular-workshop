import { User } from './user.model';
import { Column } from './column.model';

export interface Board {
  _id: string;
  title: string;
  users: User[];
  columns: Column[];
}
