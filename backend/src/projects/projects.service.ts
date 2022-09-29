import { Injectable } from '@nestjs/common';
import { ProjectRecord } from "./records/project.record";
import { GetAllProjectsResponse, Project } from "../types";

@Injectable()
export class ProjectsService {
  async getAll(): Promise<GetAllProjectsResponse> {
    const result = await ProjectRecord.getAll();

    return {
      isSuccess: true,
      data: result as Project[],
    }
  }
}
