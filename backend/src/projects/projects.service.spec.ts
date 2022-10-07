import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from './projects.service';
import { RecordNotFoundError, RecordValidationError } from "../utils/errors";
import { SprintsService } from "../sprints/sprints.service";

describe('ProjectsService', () => {
  let service: ProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectsService, SprintsService],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('getOne(id) for not existed id should throw RecordNotFoundError', async () => {
    const resGetAll = await service.getAll();

    if(resGetAll.isSuccess) {
      let maxId = 0;

      resGetAll.data.forEach(item => {
        if(item.id > maxId) maxId = item.id;
      });

      try {
        await service.getOne(String(maxId + 1));
      } catch (e) {
        expect(e).toBeInstanceOf(RecordNotFoundError);
      }
    }
  });

  test('update(id) for not existed id should throw RecordNotFoundError', async () => {
    const resGetAll = await service.getAll();

    if(resGetAll.isSuccess) {
      let maxId = 0;

      resGetAll.data.forEach(item => {
        if(item.id > maxId) maxId = item.id;
      });

      try {
        await service.update(String(maxId + 1), {
          title: 'updated',
          description: 'updated',
        });
      } catch (e) {
        expect(e).toBeInstanceOf(RecordNotFoundError);
      }
    }
  });

  test('delete(id) for not existed id should throw RecordNotFoundError', async () => {
    const resGetAll = await service.getAll();

    if(resGetAll.isSuccess) {
      let maxId = 0;

      resGetAll.data.forEach(item => {
        if(item.id > maxId) maxId = item.id;
      });

      try {
        await service.delete(String(maxId + 1));
      } catch (e) {
        expect(e).toBeInstanceOf(RecordNotFoundError);
      }
    }
  });

  test('getOne(id) for id="abc" (NaN) should throw RecordValidationError', async () => {
    const id = "abc";

    try {
      await service.getOne(id);
    } catch (e) {
      expect(e).toBeInstanceOf(RecordValidationError);
    }
  });

  test('update(id) for id="abc" (NaN) should throw RecordValidationError', async () => {
    const id = "abc";

    try {
      await service.update(id, {
        title: 'updated',
        description: 'updated',
      });
    } catch (e) {
      expect(e).toBeInstanceOf(RecordValidationError);
    }
  });

  test('delete(id) for id="abc" (NaN) should throw RecordValidationError', async () => {
    const id = "abc";

    try {
      await service.delete(id);
    } catch (e) {
      expect(e).toBeInstanceOf(RecordValidationError);
    }
  });

  test('insert(DTO) for DTO.title < 3 sign should throw RecordValidationError', async () => {
    try {
      await service.insert({
        title: "ab",
        description: "descr",
      });
    } catch (e) {
      expect(e).toBeInstanceOf(RecordValidationError);
    }
  });

  test('insert(DTO) for DTO.title > 256 sign should throw RecordValidationError', async () => {
    try {
      await service.insert({
        title: "a".repeat(260),
        description: "descr",
      });
    } catch (e) {
      expect(e).toBeInstanceOf(RecordValidationError);
    }
  });

  test('insert(DTO) for DTO.description > 256 sign should throw RecordValidationError', async () => {
    try {
      await service.insert({
        title: "abcd",
        description: "a".repeat(260),
      });
    } catch (e) {
      expect(e).toBeInstanceOf(RecordValidationError);
    }
  });

  test('getAllSprintsForProject(id) for id="abc" (NaN) should throw RecordValidationError', async () => {
    const id = "abc";

    try {
      await service.getAllSprintsForProject(id);
    } catch (e) {
      expect(e).toBeInstanceOf(RecordValidationError);
    }
  });

  test('getAllSprintsForProject(id) for not existed id should throw RecordNotFoundError', async () => {
    const resGetAll = await service.getAll();

    if(resGetAll.isSuccess) {
      let maxId = 0;

      resGetAll.data.forEach(item => {
        if(item.id > maxId) maxId = item.id;
      });

      try {
        await service.getAllSprintsForProject(String(maxId + 1));
      } catch (e) {
        expect(e).toBeInstanceOf(RecordNotFoundError);
      }
    }
  });

  test('insertSprintForProject(id) for id="abc" (NaN) should throw RecordValidationError', async () => {
    const id = "abc";

    try {
      await service.insertSprintForProject(id, {
        title: 'test - sprint',
      });
    } catch (e) {
      expect(e).toBeInstanceOf(RecordValidationError);
    }
  });
});
