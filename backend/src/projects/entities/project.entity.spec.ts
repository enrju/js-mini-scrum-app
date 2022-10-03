import { ProjectEntity } from "./project.entity";

describe('ProjectEntity', () => {
  test('shold be defined', () => {
    const entity = new ProjectEntity();

    expect(entity).toBeDefined();
  })
})