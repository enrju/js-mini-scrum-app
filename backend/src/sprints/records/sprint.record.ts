import { SprintEntity } from "../entities/sprint.entity";
import { pool } from "../../utils/db";
import { FieldPacket } from "mysql2";

type SprintRecordResults = [SprintRecord[], FieldPacket[]];

export class SprintRecord implements SprintEntity {
  id: number;
  title: string;
  project_id: number;

  constructor(obj: SprintEntity) {
    this.id = obj.id;
    this.title = obj.title;
    this.project_id = obj.project_id;
  }

  static async getAllForProject(id: number): Promise<SprintRecord[]> {
    const [results] = (await pool.execute("SELECT * FROM `sprints` WHERE `project_id` = :id", {
      id,
    })) as SprintRecordResults;

    return results.map(item => new SprintRecord(item));
  }
}