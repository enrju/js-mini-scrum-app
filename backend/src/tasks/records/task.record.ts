import { TaskEntity } from "../entities/task.entity";
import { TaskState } from "../../types";

export class TaskRecord implements TaskEntity {
  id: number;
  title: string;
  description: string | null;
  state: TaskState;
  minutes: number;
  project_id: number;
  sprint_id: number;

  constructor(obj: TaskEntity): void {
    this.id = obj.id;
    this.title = obj.title;
    this.description = obj.description;
    this.state = obj.state;
    this.minutes = obj.minutes;
    this.project_id = obj.project_id;
    this.sprint_id = obj.sprint_id;
  }

}