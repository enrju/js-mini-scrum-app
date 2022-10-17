import { Controller, Inject } from "@nestjs/common";
import { TasksService } from "./tasks.service";

@Controller('/api/v2/tasks')
export class TasksController {
  constructor(
    @Inject(TasksService) private tasksService: TasksService,
  ) {
  }
}
