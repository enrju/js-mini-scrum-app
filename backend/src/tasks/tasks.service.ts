import { Injectable } from '@nestjs/common';
import { CreateTaskForProjectResponse, GetAllTasksForProjectResponse, Task } from "../types";
import { TaskRecord } from "./records/task.record";
import { RecordNotFoundError, RecordValidationError } from "../utils/errors";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskEntity } from "./entities/task.entity";

@Injectable()
export class TasksService {
  async validateId(id: string) {
    if(!Number(id)
      || !Number.isInteger(Number(id))) {
      throw new RecordValidationError('Id is not an integer number');
    }

    const result = await TaskRecord.getOne(Number(id));
    if(!result) {
      throw new RecordNotFoundError(`There is not Task with id = ${id}`);
    }
  }

  async getAllForProject(id: string): Promise<GetAllTasksForProjectResponse> {
    //projectId was validated in ProjectService

    const result = await TaskRecord.getAllForProject(Number(id));

    return {
      isSuccess: true,
      data: result as Task[],
    }
  }

  async insertForProject(id: string, obj: CreateTaskDto): Promise<CreateTaskForProjectResponse> {
    //projectId was validated in ProjectService

    const task = new TaskRecord(obj as TaskEntity);

    const result = await task.insertForProject(Number(id));

    return {
      isSuccess: true,
      data: {
        insertedId: result,
      }
    }
  }
}
