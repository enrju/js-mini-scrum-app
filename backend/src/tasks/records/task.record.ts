import { TaskEntity } from "../entities/task.entity";
import { TaskState } from "../../types";
import { pool } from "../../utils/db";
import { FieldPacket } from "mysql2";

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
    this.id = obj.id;
    this.title = obj.title;
    this.description = obj.description;
    this.state = obj.state;
    this.minutes = obj.minutes;
    this.project_id = obj.project_id;
    this.sprint_id = obj.sprint_id;
  }

  static async getAllForProject(id: number): Promise<TaskRecord[]> {
    const [results] = (await pool.execute("SELECT * FROM `tasks` WHERE `project_id` = :id", {
      id,
    })) as TaskRecordResults;

    return results.map(item => new TaskRecord(item));
  }
}