import { SprintEntity } from "../entities/sprint.entity";
import { pool } from "../../utils/db";
import { FieldPacket, ResultSetHeader } from "mysql2";
import { sprintConfig } from "../../types";
import { RecordValidationError } from "../../utils/errors";
import { TaskRecord } from "../../tasks/records/task.record";

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

  async delete(): Promise<{
    deletedSprintRows: number,
    deletedTaskRows: number,
  }> {
    const result = {
      deletedSprintRows: 0,
      deletedTaskRows: 0,
    }

    result.deletedTaskRows = await TaskRecord.deleteAllForSprint(this.id);

    const response = (await pool.execute("DELETE FROM `sprints` WHERE `id` = :id", {
      id: this.id,
    })) as SprintRecordDeleteResult;

    result.deletedSprintRows = response[0].affectedRows;

    return result;
  }

  static async deleteAllForProject(id: number): Promise<number> {
    const result = (await pool.execute("DELETE FROM `sprints` WHERE `project_id` = :id", {
      id: id,
    })) as SprintRecordDeleteResult;

    return result[0].affectedRows;
  }
}