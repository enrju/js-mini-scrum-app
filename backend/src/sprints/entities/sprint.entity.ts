import { Sprint } from "../../types";

export class SprintEntity implements Sprint {
  id?: number;
  title: string;
  project_id: number;
}