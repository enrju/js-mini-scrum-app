import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from "./tasks.service";
import { SprintRecord } from "../sprints/records/sprint.record";
import { TaskRecord } from "./records/task.record";
import { TaskEntity } from "./entities/task.entity";

describe('TasksController', () => {
  let controller: TasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  let testTaskRecordInsertedId: number;

  test('update(...) should update last inserted project', async () => {
    const task = new TaskRecord({
      title: 'test-task-2',
      description: 'test-task-2-descr',
    } as TaskEntity);

    testTaskRecordInsertedId = await task.insertForProject(1);

    const responseUpdate = await controller.update(
      String(testTaskRecordInsertedId), {
        title: task.title + ' - updated',
        description: task.description + ' - updated',
      }
    );

    if(responseUpdate.isSuccess) {
      expect(responseUpdate.data.changedRows).toBeGreaterThan(0);

      //I can't check updated data in DB because haven't endpoint to get one task
    }
  });
});
