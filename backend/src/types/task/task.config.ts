import { TaskState } from "./task.type";

const ONE_MINUTE_IN_MS = 1000 * 60; //1 minute = 1000ms * 60;
const DELTA_TIME_IN_MIN = 1;
const DELTA_TIME_IN_MS = ONE_MINUTE_IN_MS * DELTA_TIME_IN_MIN;

export const taskConfig = {
  id: {min: 0},
  title: {min: 3, max: 256},
  description: {min: 0, max: 256},
  state: {values: TaskState},
  minutes: {min: 0},
  project_id: {min: 0},
  sprint_id: {min: 0},
  DELTA_TIME_IN_MIN: DELTA_TIME_IN_MIN,
  DELTA_TIME_IN_MS: DELTA_TIME_IN_MS,
}
