import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from "@nestjs/common";
import {
  GetAllProjectsResponse,
  GetOneProjectResponse,
  CreateProjectResponse,
  DeleteProjectResponse,
  UpdateProjectResponse,
  CreateSprintForProjectResponse,
  GetAllTasksForProjectResponse,
  CreateTaskForProjectResponse,
  UpdateTasksTimeForProjectResponse,
  GetAllSprintsForProjectResponse
} from "../types";
import { ProjectsService } from "./projects.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { CreateSprintDto } from "../sprints/dto/create-sprint.dto";
import { CreateTaskDto } from "../tasks/dto/create-task.dto";

@Controller('/api/v2/projects')
export class ProjectsController {
  constructor(
    @Inject(ProjectsService) private projectsService: ProjectsService,
  ) {
  }

  @Get('/')
  async getAll(): Promise<GetAllProjectsResponse> {
    return this.projectsService.getAll();
  }

  @Get('/:id')
  async getOne(
    @Param('id') id: string,
  ): Promise<GetOneProjectResponse> {
    return this.projectsService.getOne(id);
  }

  @Post('/')
  async insert(
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<CreateProjectResponse> {
    return this.projectsService.insert(createProjectDto);
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<UpdateProjectResponse> {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete('/:id')
  async delete(
    @Param('id') id: string,
  ): Promise<DeleteProjectResponse> {
    return this.projectsService.delete(id);
  }

  @Get('/:id/sprints')
  async getAllSprintsForProject(
    @Param('id') id: string,
  ): Promise<GetAllSprintsForProjectResponse> {
    return this.projectsService.getAllSprintsForProject(id);
  }

  @Post('/:id/sprints')
  async insertSprintForProject(
    @Param('id') id: string,
    @Body() createSprintDto: CreateSprintDto,
  ): Promise<CreateSprintForProjectResponse> {
    return this.projectsService.insertSprintForProject(id, createSprintDto);
  }

  @Get('/:id/tasks')
  async getAllTasksForProject(
    @Param('id') id: string,
  ): Promise<GetAllTasksForProjectResponse> {
    return this.projectsService.getAllTasksForProject(id);
  }

  @Post('/:id/tasks')
  async insertTaskForProject(
    @Param('id') id: string,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<CreateTaskForProjectResponse> {
    return this.projectsService.insertTaskForProject(id, createTaskDto);
  }

  @Put('/:id/tasks/time')
  async updateTasksTimeForProject(
    @Param('id') id: string,
  ): Promise<UpdateTasksTimeForProjectResponse> {
    return this.projectsService.updateTasksTimeForProject(id);
  }
}
