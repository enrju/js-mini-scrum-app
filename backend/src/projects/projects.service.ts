import { Injectable } from '@nestjs/common';
import { ProjectRecord } from "./records/project.record";
import {
  GetAllProjectsResponse,
  GetOneProjectResponse,
  CreateProjectResponse,
  Project,
  UpdateProjectResponse, DeleteProjectResponse
} from "../types";
import { CreateProjectDto } from "./dto/create-project.dto";
import { ProjectEntity } from "./entities/project.entity";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { RecordNotFoundError } from "../utils/errors";

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
      throw new RecordNotFoundError(`There is not Project with id = ${id}`);
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

  async update(id: number, changeObj: UpdateProjectDto): Promise<UpdateProjectResponse> {

    const project = await ProjectRecord.getOne(id);

    if(project) {
      const result = await project.update(changeObj.title, changeObj.description);

      return {
        isSuccess: true,
        data: {
          changedRows: result,
        }
      }
    } else {
      throw new RecordNotFoundError(`There is not Project with id = ${id}`);
    }
  }

  async delete(id: number): Promise<DeleteProjectResponse> {
    const project = await ProjectRecord.getOne(id);

    if(project) {
      const result = await project.delete();

      return {
        isSuccess: true,
        data: {
          deletedRows: result,
        }
      }
    } else {
      throw new RecordNotFoundError(`There is not Project with id = ${id}`);
    }
  }
}
