import { Sprint } from "./sprint.type";
import { ErrorResponse } from "../error";

export type GetAllSprintsForProjectResponse = {
  isSuccess: true;
  data: Sprint[];
} | ErrorResponse;

export type CreateSprintForProjectResponse = {
  isSuccess: true;
  data: {
    insertedId: number,
  };
} | ErrorResponse;

export type UpdateSprintResponse = {
  isSuccess: true;
  data: {
    changedRows: number,
  };
} | ErrorResponse;