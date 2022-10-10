import { Test, TestingModule } from '@nestjs/testing';
import { SprintsController } from './sprints.controller';
import { SprintsService } from "./sprints.service";
import { ProjectRecord } from "../projects/records/project.record";
import { pool } from "../utils/db";
import { SprintRecord } from "./records/sprint.record";

describe('SprintsController', () => {
  let controller: SprintsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SprintsController],
      providers: [SprintsService],
    }).compile();

    controller = module.get<SprintsController>(SprintsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  let testSprintRecordInsertedId: number;

  test('update(...) should update last inserted project', async () => {
    const sprint = new SprintRecord({
      title: 'test-sprint-2',
      project_id: 1,
    });

    testSprintRecordInsertedId = await sprint.insertForProject(1);

    const responseUpdate = await controller.update(
      String(testSprintRecordInsertedId), {
        title: sprint.title + ' - updated',
      }
    );

    if(responseUpdate.isSuccess) {
      expect(responseUpdate.data.changedRows).toBeGreaterThan(0);

      //I can't check updated data in DB because haven't endpoint to get one sprint
    }
  });
});
