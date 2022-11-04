import { CreateTaskForProjectRequest } from "../../types";

export class CreateTaskDto implements CreateTaskForProjectRequest {
  title: string;
  description: string | null;
}