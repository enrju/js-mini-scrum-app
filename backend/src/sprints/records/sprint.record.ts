import { SprintEntity } from "../entities/sprint.entity";
import { pool } from "../../utils/db";
import { FieldPacket, ResultSetHeader } from "mysql2";
import { sprintConfig } from "../../types";
import { RecordValidationError } from "../../utils/errors";

type SprintRecordResults = [SprintRecord[], FieldPacket[]];
type SprintRecordInsertResult = ResultSetHeader[];
type SprintRecordUpdateResult = ResultSetHeader[];
type SprintRecordDeleteResult = ResultSetHeader[];

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

  static async getOne(id: number): Promise<SprintRecord | null> {
    const [results] = (await pool.execute("SELECT * FROM `sprints` WHERE `id` = :id", {
      id,
    })) as SprintRecordResults;

    return results.length === 0 ? null : new SprintRecord(results[0]);
  }

  async insertForProject(id: number): Promise<number> {
    const result = (await pool.execute("INSERT INTO `sprints` VALUES(:id, :title, :project_id)", {
      id: 'NULL',
      title: this.title,
      project_id: id,
    })) as SprintRecordInsertResult;

    return result[0].insertId;
  }

  async update(title: string): Promise<number> {
    const result = (await pool.execute(
      "UPDATE `sprints` " +
      "SET `title` = :title " +
      "WHERE `id` = :id", {
        id: this.id,
        title: title,
      })) as SprintRecordUpdateResult;

    return result[0].changedRows;
  }

  async delete(): Promise<number> {
    const result = (await pool.execute("DELETE FROM `sprints` WHERE `id` = :id", {
      id: this.id,
    })) as SprintRecordDeleteResult;

    return result[0].affectedRows;
  }
}