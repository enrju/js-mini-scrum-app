import { Controller, Get, Inject } from "@nestjs/common";
import { GetAllProjectsResponse } from "../types";
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
}
