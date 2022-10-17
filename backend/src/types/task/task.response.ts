import { Task } from "./task.type";
import { ErrorResponse } from "../error";

export type GetAllTasksForProjectResponse = {
  isSuccess: true;
  data: Task[];
} | ErrorResponse;

export type CreateTaskForProjectResponse = {
  isSuccess: true;
  data: {
    insertedId: number,
  };
} | ErrorResponse;

export type UpdateTaskResponse = {
  isSuccess: true;
  data: {
    changedRows: number,
  };
} | ErrorResponse;