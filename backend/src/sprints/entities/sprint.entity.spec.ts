import { SprintEntity } from "./sprint.entity";

describe('SprintEntity', () => {
  test('should be defined', () => {
    const entity = new SprintEntity();

    expect(entity).toBeDefined();
  });
});