import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { ProjectRecord } from "./records/project.record";
import {
  GetAllProjectsResponse,
  GetOneProjectResponse,
  CreateProjectResponse,
  Project,
  UpdateProjectResponse, DeleteProjectResponse, GetAllSprintsForProjectResponse, CreateSprintForProjectResponse
} from "../types";
import { CreateProjectDto } from "./dto/create-project.dto";
import { ProjectEntity } from "./entities/project.entity";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { RecordNotFoundError, RecordValidationError } from "../utils/errors";
import { SprintsService } from "../sprints/sprints.service";
import { CreateSprintDto } from "../sprints/dto/create-sprint.dto";

@Injectable()
export class ProjectsService {
  constructor(
    @Inject(forwardRef(() => SprintsService)) private sprintsService: SprintsService,
  ) {
  }

  async validateId(id: string) {
    if(!Number(id)
      || !Number.isInteger(Number(id))) {
      throw new RecordValidationError('Id is not an integer number');
    }

    const result = await ProjectRecord.getOne(Number(id));
    if(!result) {
      throw new RecordNotFoundError(`There is not Project with id = ${id}`);
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
    await this.validateId(id);

    const result = await ProjectRecord.getOne(Number(id));

    if(result) {
      return {
        isSuccess: true,
        data: result as Project,
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

  async update(id: string, changeObj: UpdateProjectDto): Promise<UpdateProjectResponse> {
    await this.validateId(id);

    const project = await ProjectRecord.getOne(Number(id));

    if(project) {
      const result = await project.update(changeObj.title, changeObj.description);

      return {
        isSuccess: true,
        data: {
          changedRows: result,
        }
      }
    }
  }

  async delete(id: string): Promise<DeleteProjectResponse> {
    await this.validateId(id);

    const project = await ProjectRecord.getOne(Number(id));

    if(project) {
      const result = await project.delete();

      return {
        isSuccess: true,
        data: {
          deletedRows: result,
        }
      }
    }
  }

  async getAllSprintsForProject(id: string): Promise<GetAllSprintsForProjectResponse> {
    await this.validateId(id);

    return this.sprintsService.getAllForProject(id);
  }

  async insertSprintForProject(id: string, obj: CreateSprintDto): Promise<CreateSprintForProjectResponse> {
    await this.validateId(id);

    return this.sprintsService.insertForProject(id, obj);
  }
}
