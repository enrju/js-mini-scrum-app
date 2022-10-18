import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { RecordNotFoundError, RecordValidationError } from "../utils/errors";

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('insertForProject(DTO) for DTO.title < 3 sign should throw RecordValidationError', async () => {
    try {
      await service.insertForProject(String(1), {
        title: "ab",
        description: "test-desc - task - 2",
      });
    } catch (e) {
      expect(e).toBeInstanceOf(RecordValidationError);
    }
  });

  test('insertForProject(DTO) for DTO.title > 256 sign should throw RecordValidationError', async () => {
    try {
      await service.insertForProject(String(1), {
        title: "a".repeat(260),
        description: "test-desc - task - 2",
      });
    } catch (e) {
      expect(e).toBeInstanceOf(RecordValidationError);
    }
  });

  test('insertForProject(DTO) for DTO.description > 256 sign should throw RecordValidationError', async () => {
    try {
      await service.insertForProject(String(1), {
        title: "abc",
        description: "a".repeat(260),
      });
    } catch (e) {
      expect(e).toBeInstanceOf(RecordValidationError);
    }
  });

  test('update(id) for not existed id should throw RecordNotFoundError', async () => {
    const resGetAll = await service.getAllForProject('1');

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

  test('delete(id) for not existed id should throw RecordNotFoundError', async () => {
    const resGetAll = await service.getAllForProject('1');

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

  test('delete(id) for id="abc" (NaN) should throw RecordValidationError', async () => {
    const id = "abc";

    try {
      await service.delete(id);
    } catch (e) {
      expect(e).toBeInstanceOf(RecordValidationError);
    }
  });
});
