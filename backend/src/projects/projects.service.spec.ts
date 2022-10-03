import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from './projects.service';
import { RecordNotFoundError } from "../utils/errors";

describe('ProjectsService', () => {
  let service: ProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectsService],
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
        await service.getOne(maxId + 1);
      } catch (e) {
        expect(e).toBeInstanceOf(RecordNotFoundError);
      }
    }
  });
});
