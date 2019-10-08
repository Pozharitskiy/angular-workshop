import { User } from './user.model';

export interface Response {
  data: {
    [item: string]: any;
    _id: string;
    title: string;
    users: User[];
    columns: string;
    token: string;
  };
  success: boolean;
}
