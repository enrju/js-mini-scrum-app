import { ProjectEntity } from "./project.entity";

describe('ProjectEntity', () => {
  test('should be defined', () => {
    const entity = new ProjectEntity();

    expect(entity).toBeDefined();
  })
})