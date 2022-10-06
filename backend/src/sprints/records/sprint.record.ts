import { SprintEntity } from "../entities/sprint.entity";
import { pool } from "../../utils/db";
import { FieldPacket } from "mysql2";
import { sprintConfig } from "../../types";
import { RecordValidationError } from "../../utils/errors";

type SprintRecordResults = [SprintRecord[], FieldPacket[]];

export class SprintRecord implements SprintEntity {
  id: number;
  title: string;
  project_id: number;

  constructor(obj: SprintEntity) {
    this.validate(obj);

    this.id = obj.id;
    this.title = obj.title;
    this.project_id = obj.project_id;
  }

  validate(obj: SprintEntity): void {
    if(!obj.title
      || obj.title.length < sprintConfig.title.min
      || obj.title.length > sprintConfig.title.max) {
      throw new RecordValidationError(`Title must have from ${sprintConfig.title.min} to ${sprintConfig.title.max} signs`);
    }
  }

  static async getAllForProject(id: number): Promise<SprintRecord[]> {
    const [results] = (await pool.execute("SELECT * FROM `sprints` WHERE `project_id` = :id", {
      id,
    })) as SprintRecordResults;

    return results.map(item => new SprintRecord(item));
  }
}