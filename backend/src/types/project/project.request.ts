import { Project } from "./project.type";

export type CreateProjectRequest = Omit<Project, 'id'>;

export type UpdateProjectRequest = Omit<Project, 'id'>;