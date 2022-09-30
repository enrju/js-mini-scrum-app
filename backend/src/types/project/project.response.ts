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