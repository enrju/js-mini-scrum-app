import { forwardRef, Inject, Injectable } from "@nestjs/common";
import {
  CreateSprintForProjectResponse,
  DeleteSprintResponse,
  GetAllSprintsForProjectResponse,
  Sprint,
  UpdateSprintResponse
} from "../types";
import { SprintRecord } from "./records/sprint.record";
import { RecordNotFoundError, RecordValidationError } from "../utils/errors";
import { SprintEntity } from "./entities/sprint.entity";
import { CreateSprintDto } from "./dto/create-sprint.dto";
import { UpdateSprintDto } from "./dto/update-sprint.dto";
import { TasksService } from "../tasks/tasks.service";

@Injectable()
export class SprintsService {
  constructor(
    @Inject(forwardRef(() => TasksService)) private tasksService: TasksService,
  ) {
  }

  async validateId(id: string) {
    if(!Number(id)
      || !Number.isInteger(Number(id))) {
      throw new RecordValidationError('Id is not an integer number');
    }

    const result = await SprintRecord.getOne(Number(id));
    if(!result) {
      throw new RecordNotFoundError(`There is not Sprint with id = ${id}`);
    }
  }

  async getAllForProject(id: string): Promise<GetAllSprintsForProjectResponse> {
    //projectId was validated in ProjectService

    const result = await SprintRecord.getAllForProject(Number(id));

    return {
      isSuccess: true,
      data: result as Sprint[],
    }
  }

  async insertForProject(id: string, obj: CreateSprintDto): Promise<CreateSprintForProjectResponse> {
    //projectId was validated in ProjectService

    const sprint = new SprintRecord(obj as SprintEntity);

    const result = await sprint.insertForProject(Number(id));

    return {
      isSuccess: true,
      data: {
        insertedId: result,
      }
    }
  }

  async update(id: string, changeObj: UpdateSprintDto): Promise<UpdateSprintResponse> {
    await this.validateId(id);

    const sprint = await SprintRecord.getOne(Number(id));

    if(sprint) {
      const result = await sprint.update(changeObj.title);

      return {
        isSuccess: true,
        data: {
          changedRows: result,
        }
      }
    }
  }

  async delete(id: string): Promise<DeleteSprintResponse> {
    await this.validateId(id);

    const sprint = await SprintRecord.getOne(Number(id));

    if(sprint) {
      const result = await sprint.delete();

      return {
        isSuccess: true,
        data: {
          deletedRows: result,
        }
      }
    }
  }
}
