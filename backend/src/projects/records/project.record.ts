import { ProjectEntity } from "../entities/project.entity";
import { pool } from "../../utils/db";
import { FieldPacket } from "mysql2";

type ProjectRecordResults = [ProjectRecord[], FieldPacket[]];

export class ProjectRecord implements ProjectEntity {
  id: number;
  title: string;
  description: string | null;

  constructor(obj: ProjectEntity) {
    this.id = obj.id;
    this.title = obj.title;
    this.description = obj.description;
  }

  static async getAll(): Promise<ProjectRecord[]> {
    const [results] = (await pool.execute('SELECT * FROM `projects`')) as ProjectRecordResults;

    return results.map(item => new ProjectRecord(item));
  }

  static async getOne(id: number): Promise<ProjectRecord | null> {
    const [results] = (await pool.execute('SELECT * FROM `projects` WHERE `id` = :id', {
      id,
    })) as ProjectRecordResults;

    return results.length === 0 ? null : new ProjectRecord(results[0]);
  }
}