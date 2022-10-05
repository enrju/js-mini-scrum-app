import { SprintEntity } from "../entities/sprint.entity";

export class SprintRecord implements SprintEntity {
  id: number;
  projectId: number;
  title: string;

  constructor(obj: SprintEntity) {
    this.id = obj.id;
    this.title = obj.title;
    this.projectId = obj.projectId;
  }

}