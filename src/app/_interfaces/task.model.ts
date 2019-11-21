export interface Task {
  id: number;
  name: string;
  isCompleted: boolean;
  dueDate?: Date;
  creationDate: Date;
  userId: string;
}
