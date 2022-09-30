import { ProjectEntity } from "../entities/project.entity";
import { pool } from "../../utils/db";
import { FieldPacket, ResultSetHeader } from "mysql2";

type ProjectRecordResults = [ProjectRecord[], FieldPacket[]];
type ProjectRecordInsertResult = ResultSetHeader[];

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

  async insert(): Promise<number> {
    const result = (await pool.execute('INSERT INTO `projects` VALUES(:id, :title, :description)', {
      id: 'NULL',
      title: this.title,
      description: this.description,
    })) as ProjectRecordInsertResult;

    return result[0].insertId;
  }
}