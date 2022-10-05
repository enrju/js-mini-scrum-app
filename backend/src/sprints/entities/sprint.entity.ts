import { Sprint } from "../../types";

export class SprintEntity implements Sprint {
  id?: number;
  title: string;
  projectId: number;
}