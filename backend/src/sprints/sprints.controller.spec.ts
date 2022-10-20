import { Test, TestingModule } from '@nestjs/testing';
import { SprintsController } from './sprints.controller';
import { SprintsService } from "./sprints.service";
import { SprintRecord } from "./records/sprint.record";
import { TasksService } from "../tasks/tasks.service";
import { TasksController } from "../tasks/tasks.controller";
import { TaskRecord } from "../tasks/records/task.record";
import { TaskDirection, TaskState } from "../types";

describe('SprintsController', () => {
  let controller: SprintsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SprintsController],
      providers: [SprintsService, TasksService],
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

  test('delete(id) should delete last inserted project', async () => {
    const response = await controller.delete(String(testSprintRecordInsertedId));

    if(response.isSuccess) {
      expect(response.data.deletedRows).toBeGreaterThan(0);
    }
  });

  test('updateTaskStateForSprint() should change state of task', async () => {
    //it was used exising task with state "BACKLOG"
    const taskId = '12';
    const sprintId = '1';
    let task = await TaskRecord.getOne(Number(taskId));
    expect(task.state).toBe(TaskState[TaskState.BACKLOG]);
    expect(task.sprint_id).toBeNull();

    let moveDirection = 'right';
    await controller.updateTaskStateForSprint(sprintId, taskId, moveDirection);
    task = await TaskRecord.getOne(Number(taskId));
    expect(task.state).toBe(TaskState[TaskState.TODO]);
    expect(task.sprint_id).toBe(Number(sprintId));

    await controller.updateTaskStateForSprint(sprintId, taskId, moveDirection);
    task = await TaskRecord.getOne(Number(taskId));
    expect(task.state).toBe(TaskState[TaskState.DOING]);
    expect(task.sprint_id).toBe(Number(sprintId));

    await controller.updateTaskStateForSprint(sprintId, taskId, moveDirection);
    task = await TaskRecord.getOne(Number(taskId));
    expect(task.state).toBe(TaskState[TaskState.DONE]);
    expect(task.sprint_id).toBe(Number(sprintId));

    moveDirection = 'left';
    await controller.updateTaskStateForSprint(sprintId, taskId, moveDirection);
    task = await TaskRecord.getOne(Number(taskId));
    expect(task.state).toBe(TaskState[TaskState.DOING]);
    expect(task.sprint_id).toBe(Number(sprintId));

    await controller.updateTaskStateForSprint(sprintId, taskId, moveDirection);
    task = await TaskRecord.getOne(Number(taskId));
    expect(task.state).toBe(TaskState[TaskState.TODO]);
    expect(task.sprint_id).toBe(Number(sprintId));

    await controller.updateTaskStateForSprint(sprintId, taskId, moveDirection);
    task = await TaskRecord.getOne(Number(taskId));
    expect(task.state).toBe(TaskState[TaskState.BACKLOG]);
    expect(task.sprint_id).toBeNull();
  });
});
