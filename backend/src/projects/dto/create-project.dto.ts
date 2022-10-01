import { CreateProjectRequest } from "../../types/project/project.request";

export class CreateProjectDto implements CreateProjectRequest {
  title: string;
  description: string | null;
}