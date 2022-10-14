import { TaskState } from "./task.type";

export const taskConfig = {
  id: {min: 0},
  title: {min: 3, max: 256},
  description: {min: 0, max: 256},
  state: {values: TaskState},
  minutes: {min: 0},
  project_id: {min: 0},
  sprint_id: {min: 0},
}