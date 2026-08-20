import { User } from './user.model';
export type TaskStatus = 'pending' | 'completed';
export interface Task {
  _id: string;
  title: string;
  description: string;
  status: TaskStatus;
  assignedTo: User;
  createdBy: User;
  createdAt: string;
  updatedAt: string;
}
export interface TaskPayload {
  title: string;
  description: string;
  status?: TaskStatus;
  assignedTo?: string;
}
