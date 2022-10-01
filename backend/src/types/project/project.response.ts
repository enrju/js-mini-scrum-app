import { Project } from "./project.type";
import { ErrorResponse } from "../error/error.response";

export type GetAllProjectsResponse = {
  isSuccess: true;
  data: Project[];
} | ErrorResponse;

export type GetOneProjectResponse = {
  isSuccess: true;
  data: Project;
} | ErrorResponse;

export type CreateProjectResponse = {
  isSuccess: true;
  data: {
    insertedId: number,
  };
} | ErrorResponse;

export type UpdateProjectResponse = {
  isSuccess: true;
  data: {
    changedRows: number,
  };
} | ErrorResponse;

export type DeleteProjectResponse = {
  isSuccess: true;
  data: {
    deletedRows: number,
  };
} | ErrorResponse;