import { Injectable } from '@nestjs/common';
import { ProjectRecord } from "./records/project.record";
import { GetAllProjectsResponse, GetOneProjectResponse, Project } from "../types";

@Injectable()
export class ProjectsService {
  async getAll(): Promise<GetAllProjectsResponse> {
    const result = await ProjectRecord.getAll();

    return {
      isSuccess: true,
      data: result as Project[],
    }
  }

  async getOne(id: number): Promise<GetOneProjectResponse> {
    const result = await ProjectRecord.getOne(id);

    if(result) {
      return {
        isSuccess: true,
        data: result as Project,
      }
    } else {
      return {
        isSuccess: false,
        msgError: `There is not Project with id = ${id}`,
      }
    }
  }
}
