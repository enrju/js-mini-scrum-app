import { Injectable } from '@nestjs/common';
import { GetAllSprintsForProjectResponse, Sprint } from "../types";
import { SprintRecord } from "./records/sprint.record";
import { RecordValidationError } from "../utils/errors";

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
}
