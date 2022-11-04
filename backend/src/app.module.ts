import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { SprintsModule } from './sprints/sprints.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [ProjectsModule, SprintsModule, TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
