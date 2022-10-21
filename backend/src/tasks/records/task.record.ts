import { TaskEntity } from "../entities/task.entity";
import { taskConfig, TaskState } from "../../types";
import { pool } from "../../utils/db";
import { FieldPacket, ResultSetHeader } from "mysql2";
import { RecordValidationError } from "../../utils/errors";

type TaskRecordResults = [TaskRecord[], FieldPacket[]];
type TaskRecordInsertResult = ResultSetHeader[];
type TaskRecordUpdateResult = ResultSetHeader[];
type TaskRecordDeleteResult = ResultSetHeader[];

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

  async delete(): Promise<number> {
    const result = (await pool.execute("DELETE FROM `tasks` WHERE `id` = :id", {
      id: this.id,
    })) as TaskRecordDeleteResult;

    return result[0].affectedRows;
  }

  static async updateAllTimeForProject(id: number): Promise<number> {
    const result = (await pool.execute(
      "UPDATE `tasks` SET `minutes` = `minutes` + :deltaTime " +
      "WHERE `project_id` = :projectId AND `state` = :state", {
        deltaTime: taskConfig.DELTA_TIME_IN_MIN,
        projectId: id,
        state: TaskState[TaskState.DOING],
      })) as TaskRecordUpdateResult;

    return result[0].changedRows;
  }

  async moveRightForSprint(sprintId: number): Promise<number> {
    let result: TaskRecordUpdateResult;

    const state = TaskState[TaskState[this.state]];

    switch (state) {
      case TaskState[TaskState.BACKLOG]:
        result = (await pool.execute(
          "UPDATE `tasks` SET `state` = :state, `sprint_id` = :sprintId WHERE `id` = :id", {
            id: this.id,
            state: TaskState[TaskState.TODO],
            sprintId,
          })) as TaskRecordUpdateResult;

        return result[0].changedRows;

      case TaskState[TaskState.TODO]:
        result = (await pool.execute(
          "UPDATE `tasks` SET `state` = :state WHERE `id` = :id", {
            id: this.id,
            state: TaskState[TaskState.DOING],
          })) as TaskRecordUpdateResult;

        return result[0].changedRows;

      case TaskState[TaskState.DOING]:
        result = (await pool.execute(
          "UPDATE `tasks` SET `state` = :state WHERE `id` = :id", {
            id: this.id,
            state: TaskState[TaskState.DONE],
          })) as TaskRecordUpdateResult;

        return result[0].changedRows;

    }
  }

  async moveLeftForSprint(sprintId: number): Promise<number> {
    let result: TaskRecordUpdateResult;

    const state = TaskState[TaskState[this.state]];

    switch (state) {
      case TaskState[TaskState.TODO]:
        result = (await pool.execute(
          "UPDATE `tasks` SET `state` = :state, `sprint_id` = null WHERE `id` = :id", {
            id: this.id,
            state: TaskState[TaskState.BACKLOG],
          })) as TaskRecordUpdateResult;

        return result[0].changedRows;

      case TaskState[TaskState.DOING]:
        result = (await pool.execute(
          "UPDATE `tasks` SET `state` = :state WHERE `id` = :id", {
            id: this.id,
            state: TaskState[TaskState.TODO],
          })) as TaskRecordUpdateResult;

        return result[0].changedRows;

      case TaskState[TaskState.DONE]:
        result = (await pool.execute(
          "UPDATE `tasks` SET `state` = :state WHERE `id` = :id", {
            id: this.id,
            state: TaskState[TaskState.DOING],
          })) as TaskRecordUpdateResult;

        return result[0].changedRows;

    }
  }

  static async deleteAllForSprint(id: number): Promise<number> {
    const result = (await pool.execute("DELETE FROM `tasks` WHERE `sprint_id` = :id", {
      id: id,
    })) as TaskRecordDeleteResult;

    return result[0].affectedRows;
  }

  static async deleteAllForProject(id: number): Promise<number> {
    const result = (await pool.execute("DELETE FROM `tasks` WHERE `project_id` = :id", {
      id: id,
    })) as TaskRecordDeleteResult;

    return result[0].affectedRows;
  }
}