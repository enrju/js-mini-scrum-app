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
import { RecordNotFoundError, RecordValidationError } from "../utils/errors";

@Injectable()
export class ProjectsService {
  validateId(id: string) {
    if(!Number(id)
      || !Number.isInteger(Number(id))) {
      throw new RecordValidationError('Id in not an integer number');
    }
  }

  async getAll(): Promise<GetAllProjectsResponse> {
    const result = await ProjectRecord.getAll();

    return {
      isSuccess: true,
      data: result as Project[],
    }
  }

  async getOne(id: string): Promise<GetOneProjectResponse> {
    this.validateId(id);

    const result = await ProjectRecord.getOne(Number(id));

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

  async update(id: string, changeObj: UpdateProjectDto): Promise<UpdateProjectResponse> {
    this.validateId(id);

    const project = await ProjectRecord.getOne(Number(id));

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

  async delete(id: string): Promise<DeleteProjectResponse> {
    this.validateId(id);

    const project = await ProjectRecord.getOne(Number(id));

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
