import { TaskEntity } from "./task.entity";

describe('TaskEntity', () => {
  test('should be defined', () => {
    const entity = new TaskEntity();

    expect(entity).toBeDefined();
  });
});