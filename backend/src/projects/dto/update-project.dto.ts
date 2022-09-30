import { UpdateProjectRequest } from "../../types/project/project.request";

export class UpdateProjectDto implements UpdateProjectRequest {
  title: string;
  description: string | null;
}