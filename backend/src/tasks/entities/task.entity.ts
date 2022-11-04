import { Task, TaskState } from "../../types";

export class TaskEntity implements Task {
  id?: number;
  title: string;
  description: string | null;
  state: TaskState;
  minutes: number;
  project_id: number;
  sprint_id: number;
}