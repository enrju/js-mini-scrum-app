import { Body, Controller, Inject, Param, Put } from "@nestjs/common";
import { UpdateSprintResponse } from "../types";
import { UpdateSprintDto } from "./dto/update-sprint.dto";
import { SprintsService } from "./sprints.service";

@Controller('/api/v2/sprints')
export class SprintsController {
  constructor(
    @Inject(SprintsService) private sprintsService: SprintsService,
  ) {
  }
