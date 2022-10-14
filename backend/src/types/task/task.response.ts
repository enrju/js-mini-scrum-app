import { Task } from "./task.type";
import { ErrorResponse } from "../error";

export type GetAllTasksForProjectResponse = {
  isSuccess: true;
  data: Task[];
} | ErrorResponse;