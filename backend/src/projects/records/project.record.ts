import { ProjectEntity } from "../entities/project.entity";
import { pool } from "../../utils/db";
import { FieldPacket, ResultSetHeader } from "mysql2";
import { projectConfig } from "../../types";
import { RecordValidationError } from "../../utils/errors";

type ProjectRecordResults = [ProjectRecord[], FieldPacket[]];
type ProjectRecordInsertResult = ResultSetHeader[];
type ProjectRecordUpdateResult = ResultSetHeader[];
type ProjectRecordDeleteResult = ResultSetHeader[];

export class ProjectRecord implements ProjectEntity {
  id: number;
  title: string;
  description: string | null;

  constructor(obj: ProjectEntity) {
    this.validate(obj);

    this.id = obj.id;
    this.title = obj.title;
    this.description = obj.description;
  }

  validate(obj: ProjectEntity): void {
    if(!obj.title
      || obj.title.length < projectConfig.title.min
      || obj.title.length > projectConfig.title.max) {
      throw new RecordValidationError(`Title must have from ${projectConfig.title.min} to ${projectConfig.title.max} signs`);
    }

    if(obj.description
      && (obj.description.length < projectConfig.description.min
      || obj.description.length > projectConfig.description.max)) {
      throw new RecordValidationError(`Description must have from ${projectConfig.description.min} to ${projectConfig.description.max} signs`);
    }
  }

  static async getAll(): Promise<ProjectRecord[]> {
    const [results] = (await pool.execute("SELECT * FROM `projects`")) as ProjectRecordResults;

    return results.map(item => new ProjectRecord(item));
  }

  static async getOne(id: number): Promise<ProjectRecord | null> {
    const [results] = (await pool.execute("SELECT * FROM `projects` WHERE `id` = :id", {
      id,
    })) as ProjectRecordResults;

    return results.length === 0 ? null : new ProjectRecord(results[0]);
  }

  async insert(): Promise<number> {
    const result = (await pool.execute("INSERT INTO `projects` VALUES(:id, :title, :description)", {
      id: 'NULL',
      title: this.title,
      description: this.description,
    })) as ProjectRecordInsertResult;

    return result[0].insertId;
  }

  async update(title: string, description: string | null = null): Promise<number> {
    const result = (await pool.execute(
      "UPDATE `projects` " +
      "SET `title` = :title, `description` = :description " +
      "WHERE `id` = :id", {
        id: this.id,
        title: title,
        description: description,
      })) as ProjectRecordUpdateResult;

    return result[0].changedRows;
  }

  async delete(): Promise<number> {
    const result = (await pool.execute("DELETE FROM `projects` WHERE `id` = :id", {
      id: this.id,
    })) as ProjectRecordDeleteResult;

    return result[0].affectedRows;
  }
}