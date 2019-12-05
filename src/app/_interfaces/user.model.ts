import { Task } from './task.model';

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  dateOfBirth: string;
  username: string;
  password: string;
  tasks?: Task[];
}
