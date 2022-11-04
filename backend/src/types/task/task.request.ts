import { Task } from "./task.type";

export type CreateTaskForProjectRequest = Omit<Task, 'id' | 'state' | 'minutes' | 'project_id' | 'sprint_id'>;

export type UpdateTaskRequest = Omit<Task, 'id' | 'state' | 'minutes' | 'project_id' | 'sprint_id'>;