import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from "./projects.service";
import { ProjectRecord } from "./records/project.record";
import { pool } from "../utils/db";

describe('ProjectsController', () => {
  let controller: ProjectsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [ProjectsService],
    }).compile();

    controller = module.get<ProjectsController>(ProjectsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  let testProjectRecord: ProjectRecord;
  let testProjectRecordInsertedId: number;

  beforeAll(() => {
    testProjectRecord = new ProjectRecord({
      title: 'test',
      description: 'testowy',
    });
  });

  afterAll(async () => {
    await pool.end();
  });
});
