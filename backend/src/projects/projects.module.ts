import { forwardRef, Module } from "@nestjs/common";
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { SprintsModule } from "../sprints/sprints.module";

@Module({
  imports: [
    forwardRef(() => SprintsModule),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService]
})
export class ProjectsModule {}
