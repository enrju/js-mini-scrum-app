import { Project } from "./project.type";

export type GetAllProjectsResponse = {
  isSuccess: true;
  data: Project[];
} | {
  isSuccess: false;
  msgError: string;
}

export type GetOneProjectResponse = {
  isSuccess: true;
  data: Project;
} | {
  isSuccess: false;
  msgError: string;
}

export type CreateProjectResponse = {
  isSuccess: true;
  data: {
    insertedId: number,
  };
} | {
  isSuccess: false;
  msgError: string;
}

export type UpdateProjectResponse = {
  isSuccess: true;
  data: {
    updatedId: number,
  };
} | {
  isSuccess: false;
  msgError: string;
}