import { UpdateTaskRequest } from "../../types";

export class UpdateTaskDto implements UpdateTaskRequest {
  title: string;
  description: string | null;
}