import { Controller, Get, Inject, Param } from "@nestjs/common";
import { GetAllProjectsResponse, GetOneProjectResponse } from "../types";
import { ProjectsService } from "./projects.service";

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
}
