import { Body, Controller, Delete, Inject, Param, Put } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { DeleteTaskResponse, UpdateTaskResponse } from "../types";
import { UpdateTaskDto } from "./dto/update-task.dto";

@Controller('/api/v2/tasks')
export class TasksController {
  constructor(
    @Inject(TasksService) private tasksService: TasksService,
  ) {
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<UpdateTaskResponse> {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete('/:id')
  async delete(
    @Param('id') id: string,
  ): Promise<DeleteTaskResponse> {
    return this.tasksService.delete(id);
  }
}
