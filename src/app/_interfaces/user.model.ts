import { Task } from './task.model';

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  age: number;

  tasks?: Task[];
}
