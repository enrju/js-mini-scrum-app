import { Project } from "../../types";

export class ProjectEntity implements Project {
  id?: number;
  title: string;
  description: string | null;
}