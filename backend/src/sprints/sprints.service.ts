import { Injectable } from '@nestjs/common';
import { GetAllSprintsForProjectResponse, Sprint } from "../types";
import { SprintRecord } from "./records/sprint.record";

@Injectable()
export class SprintsService {
  async getAllForProject(id: string): Promise<GetAllSprintsForProjectResponse> {
    const result = await SprintRecord.getAllForProject(Number(id));

    return {
      isSuccess: true,
      data: result as Sprint[],
    }
  }
}
