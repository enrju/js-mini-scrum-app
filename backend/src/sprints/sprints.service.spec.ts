import { Test, TestingModule } from '@nestjs/testing';
import { SprintsService } from './sprints.service';
import { RecordNotFoundError, RecordValidationError } from "../utils/errors";

describe('SprintsService', () => {
  let service: SprintsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SprintsService],
    }).compile();

    service = module.get<SprintsService>(SprintsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('getAllForProject(id) for id="abc" (NaN) should throw RecordValidationError', async () => {
    const id = "abc";

    try {
      await service.getAllForProject(id);
    } catch (e) {
      expect(e).toBeInstanceOf(RecordValidationError);
    }
  });

  test('insertForProject(DTO) for DTO.title < 3 sign should throw RecordValidationError', async () => {
    try {
      await service.insertForProject(String(1), {
        title: "ab",
      });
    } catch (e) {
      expect(e).toBeInstanceOf(RecordValidationError);
    }
  });

  test('insertForProject(DTO) for DTO.title > 256 sign should throw RecordValidationError', async () => {
    try {
      await service.insertForProject(String(1), {
        title: "a".repeat(260),
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
