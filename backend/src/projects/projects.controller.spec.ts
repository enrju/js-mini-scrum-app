import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from "./projects.service";
import { ProjectRecord } from "./records/project.record";
import { pool } from "../utils/db";
import { CreateProjectDto } from "./dto/create-project.dto";

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

  test('insert(testProjectRecord) should insert project into DB and return id', async () => {
    const response = await controller.insert(testProjectRecord as CreateProjectDto);

    expect(response.isSuccess).toBeTruthy();

    if(response.isSuccess) {
      testProjectRecordInsertedId = response.data.insertedId;

      expect(response.data.insertedId).toBeDefined();
      expect(response.data.insertedId).toBeGreaterThan(0);
    }
  });
});
