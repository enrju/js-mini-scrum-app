import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from "@nestjs/common";
import {
  GetAllProjectsResponse,
  GetOneProjectResponse,
  CreateProjectResponse,
  DeleteProjectResponse,
  UpdateProjectResponse
} from "../types";
import { ProjectsService } from "./projects.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";

@Controller('/api/v2/projects')
export class ProjectsController {
  constructor(
    @Inject(ProjectsService) private projectService: ProjectsService,
  ) {
  }

  @Get('/')
  async getAll(): Promise<GetAllProjectsResponse> {
    return this.projectService.getAll();
  }

  @Get('/:id')
  async getOne(
    @Param('id') id: string,
  ): Promise<GetOneProjectResponse> {
    return this.projectService.getOne(Number(id));
  }

  @Post('/')
  async insert(
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<CreateProjectResponse> {
    return this.projectService.insert(createProjectDto);
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<UpdateProjectResponse> {
    return this.projectService.update(Number(id), updateProjectDto);
  }

  @Delete('/:id')
  async delete(
    @Param('id') id: string,
  ): Promise<DeleteProjectResponse> {
    return this.projectService.delete(Number(id));
  }
}
