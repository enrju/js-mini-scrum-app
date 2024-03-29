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

export type DeleteTaskResponse = {
  isSuccess: true;
  data: {
    deletedTaskRows: number,
  };
} | ErrorResponse;

export type UpdateTasksTimeForProjectResponse = {
  isSuccess: true;
  data: {
    changedRows: number,
  };
} | ErrorResponse;

export type UpdateTaskStateForSprintResponse = {
  isSuccess: true;
  data: {
    changedRows: number,
  };
} | ErrorResponse;