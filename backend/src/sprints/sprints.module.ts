import { forwardRef, Module } from "@nestjs/common";
import { SprintsController } from './sprints.controller';
import { SprintsService } from './sprints.service';
import { TasksModule } from "../tasks/tasks.module";

@Module({
  imports: [
    forwardRef(() => TasksModule),
  ],
  controllers: [SprintsController],
  providers: [SprintsService],
  exports: [SprintsService],
})
export class SprintsModule {}
