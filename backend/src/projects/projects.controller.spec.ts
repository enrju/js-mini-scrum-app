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

  test('getAll() should return defined data', async () => {
    const response = await controller.getAll();

    expect(response.isSuccess).toBeTruthy();

    if(response.isSuccess) {
      expect(response.data).toBeDefined();
      expect(response.data.length).toBeGreaterThan(0);
    }
  });

  test('getOne(id) should return last inserted project', async () => {
    const response = await controller.getOne(String(testProjectRecordInsertedId));

    expect(response.isSuccess).toBeTruthy();

    if(response.isSuccess) {
      expect(response.data.id).toBeDefined();
      expect(response.data.title).toBe(testProjectRecord.title);
      expect(response.data.description).toBe(testProjectRecord.description);
    }
  });

  test('update(...) should update last inserted project', async () => {
    const responseGetOne = await controller.getOne(String(testProjectRecordInsertedId));

    if(responseGetOne.isSuccess) {
      const updatedTitle = responseGetOne.data.title + ' - updated';
      const updatedDescription = responseGetOne.data.description + ' - updated';

      const responseUpdate = await controller
        .update(
          String(testProjectRecordInsertedId),
          {
            title: updatedTitle,
            description: updatedDescription,
          });

      if(responseUpdate.isSuccess) {
        expect(responseUpdate.data.changedRows).toBeGreaterThan(0);

        const responseGetOneUpdated = await controller.getOne(String(testProjectRecordInsertedId));

        if(responseGetOneUpdated.isSuccess) {
          expect(responseGetOneUpdated.data.title).toBe(updatedTitle);
          expect(responseGetOneUpdated.data.description).toBe(updatedDescription);
        }
      }
    }
  });
});
