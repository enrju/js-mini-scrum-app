import { TaskEntity } from "../entities/task.entity";
import { taskConfig, TaskState } from "../../types";
import { pool } from "../../utils/db";
import { FieldPacket } from "mysql2";
import { RecordValidationError } from "../../utils/errors";

type TaskRecordResults = [TaskRecord[], FieldPacket[]];

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
}