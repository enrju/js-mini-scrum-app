export enum TaskState {
  BACKLOG,
  TODO,
  DOING,
  DONE,
}

export interface Task {
  id?: number;
  title: string;
  description: string | null;
  state: TaskState;
  minutes: number;
  project_id: number;
  sprint_id: number;
}

export enum TaskDirection {
  right,
  left,
}