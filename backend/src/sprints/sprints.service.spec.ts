import { Test, TestingModule } from '@nestjs/testing';
import { SprintsService } from './sprints.service';
import { RecordValidationError } from "../utils/errors";

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
});
