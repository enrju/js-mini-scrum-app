import { forwardRef, Module } from "@nestjs/common";
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { SprintsModule } from "../sprints/sprints.module";
import { TasksModule } from "../tasks/tasks.module";

@Module({
  imports: [
    forwardRef(() => SprintsModule),
    forwardRef(() => TasksModule),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService]
})
export class ProjectsModule {}
