import { TaskEntity } from "../entities/task.entity";
import { taskConfig, TaskState } from "../../types";
import { pool } from "../../utils/db";
import { FieldPacket, ResultSetHeader } from "mysql2";
import { RecordValidationError } from "../../utils/errors";

type TaskRecordResults = [TaskRecord[], FieldPacket[]];
type TaskRecordInsertResult = ResultSetHeader[];
type TaskRecordUpdateResult = ResultSetHeader[];

export class TaskRecord implements TaskEntity {
  id: number;
  title: string;
  description: string | null;
  state: TaskState;
  minutes: number;
  project_id: number;
  sprint_id: number;

  constructor(obj: TaskEntity) {
    this.validate(obj);

    this.id = obj.id;
    this.title = obj.title;
    this.description = obj.description;
    this.state = obj.state;
    this.minutes = obj.minutes;
    this.project_id = obj.project_id;
    this.sprint_id = obj.sprint_id;
  }

  validate(obj: TaskEntity): void {
    if(!obj.title
      || obj.title.length < taskConfig.title.min
      || obj.title.length > taskConfig.title.max) {
      throw new RecordValidationError(`Title must have from ${taskConfig.title.min} to ${taskConfig.title.max} signs`);
    }

    if(obj.description
      && (obj.description.length < taskConfig.description.min
      || obj.description.length > taskConfig.description.max)) {
      throw new RecordValidationError(`Description must have from ${taskConfig.description.min} to ${taskConfig.description.max} signs`);
    }
  }

  static async getAllForProject(id: number): Promise<TaskRecord[]> {
    const [results] = (await pool.execute("SELECT * FROM `tasks` WHERE `project_id` = :id", {
      id,
    })) as TaskRecordResults;

    return results.map(item => new TaskRecord(item));
  }

  static async getOne(id: number): Promise<TaskRecord | null> {
    const [results] = (await pool.execute("SELECT * FROM `tasks` WHERE `id` = :id", {
      id,
    })) as TaskRecordResults;

    return results.length === 0 ? null : new TaskRecord(results[0]);
  }

  async insertForProject(id: number): Promise<number> {
    const result = (await pool.execute(
      "INSERT INTO `tasks` VALUES(:id, :title, :description, :state, :minutes, :project_id, :sprint_id)", {
        id: 'NULL',
        title: this.title,
        description: this.description,
        state: TaskState[TaskState.BACKLOG],
        minutes: 0,
        project_id: id,
        sprint_id: null,
    })) as TaskRecordInsertResult;

    return result[0].insertId;
  }

  async update(title: string, description: string): Promise<number> {
    const result = (await pool.execute(
      "UPDATE `tasks` " +
      "SET `title` = :title, `description` = :description " +
      "WHERE `id` = :id", {
        id: this.id,
        title: title,
        description: description,
      })) as TaskRecordUpdateResult;

    return result[0].changedRows;
  }
}