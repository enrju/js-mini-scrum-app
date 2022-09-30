import { Injectable } from '@nestjs/common';
import { ProjectRecord } from "./records/project.record";
import { GetAllProjectsResponse, GetOneProjectResponse, CreateProjectResponse, Project } from "../types";
import { CreateProjectDto } from "./dto/create-project.dto";
import { ProjectEntity } from "./entities/project.entity";

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

  async insert(obj: CreateProjectDto): Promise<CreateProjectResponse> {
    const project = new ProjectRecord(obj as ProjectEntity);

    const result = await project.insert();

    return {
      isSuccess: true,
      data: {
        insertedId: result,
      }
    }
  }
}
