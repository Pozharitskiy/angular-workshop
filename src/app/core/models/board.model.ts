import { User } from './user.model';

export interface Board {
  _id: string;
  title: string;
  users: User[];
  columns: string;
}
