import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { RecordValidationError } from "../utils/errors";

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
});
