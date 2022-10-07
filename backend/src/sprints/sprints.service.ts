import { Injectable } from '@nestjs/common';
import { CreateSprintForProjectResponse, GetAllSprintsForProjectResponse, Sprint } from "../types";
import { SprintRecord } from "./records/sprint.record";
import { RecordValidationError } from "../utils/errors";
import { SprintEntity } from "./entities/sprint.entity";
import { CreateSprintDto } from "./dto/create-sprint.dto";

@Injectable()
export class SprintsService {
  validateId(id: string) {
    if(!Number(id)
      || !Number.isInteger(Number(id))) {
      throw new RecordValidationError('Id is not an integer number');
    }
  }

  async getAllForProject(id: string): Promise<GetAllSprintsForProjectResponse> {
    this.validateId(id);

    const result = await SprintRecord.getAllForProject(Number(id));

    return {
      isSuccess: true,
      data: result as Sprint[],
    }
  }

  async insertForProject(id: string, obj: CreateSprintDto): Promise<CreateSprintForProjectResponse> {
    this.validateId(id);

    const sprint = new SprintRecord(obj as SprintEntity);

    const result = await sprint.insertForProject(Number(id));

    return {
      isSuccess: true,
      data: {
        insertedId: result,
      }
    }
  }
}
