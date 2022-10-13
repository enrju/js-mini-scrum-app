import { Injectable } from '@nestjs/common';
import { GetAllTasksForProjectResponse, Task } from "../types";
import { TaskRecord } from "./records/task.record";

@Injectable()
export class TasksService {
  async getAllForProject(id: string): Promise<GetAllTasksForProjectResponse> {
    //projectId was validated in ProjectService

    const result = await TaskRecord.getAllForProject(Number(id));

    return {
      isSuccess: true,
      data: result as Task[],
    }
  }
}
