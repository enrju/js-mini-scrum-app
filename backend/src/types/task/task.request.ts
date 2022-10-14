import { Task } from "./task.type";

export type CreateTaskForProjectRequest = Omit<Task, 'id' | 'state' | 'minutes' | 'project_id' | 'sprint_id'>;