import { Sprint } from "./sprint.type";
import { ErrorResponse } from "../error";

export type GetAllSprintsForProjectResponse = {
  isSuccess: true;
  data: Sprint[];
} | ErrorResponse;