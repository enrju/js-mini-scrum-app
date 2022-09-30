import { Project } from "./project.type";

export type CreateProjectRequest = Omit<Project, 'id'>;