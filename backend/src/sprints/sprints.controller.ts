import { Body, Controller, Delete, Inject, Param, Put } from "@nestjs/common";
import {
  DeleteSprintResponse,
  UpdateSprintResponse,
  UpdateTaskStateForSprintResponse
} from "../types";
import { UpdateSprintDto } from "./dto/update-sprint.dto";
import { SprintsService } from "./sprints.service";

@Controller('/api/v2/sprints')
export class SprintsController {
  constructor(
    @Inject(SprintsService) private sprintsService: SprintsService,
  ) {
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateSprintDto: UpdateSprintDto,
  ): Promise<UpdateSprintResponse> {
    return this.sprintsService.update(id, updateSprintDto);
  }

  @Delete('/:id')
  async delete(
    @Param('id') id: string,
  ): Promise<DeleteSprintResponse> {
    return this.sprintsService.delete(id);
  }

  @Put('/:sprintId/tasks/:taskId/:moveDirection')
  async updateTaskStateForSprint(
    @Param('sprintId') sprintId: string,
    @Param('taskId') taskId: string,
    @Param('moveDirection') moveDirection: string,
  ): Promise<UpdateTaskStateForSprintResponse> {
    return this.sprintsService.updateTaskStateForSprint(taskId, sprintId, moveDirection);
  }
}
