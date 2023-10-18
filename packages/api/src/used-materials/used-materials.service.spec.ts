import { Test, TestingModule } from '@nestjs/testing';
import { UsedMaterialsService } from './used-materials.service';

describe('UsedMaterialsService', () => {
  let service: UsedMaterialsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsedMaterialsService],
    }).compile();

    service = module.get<UsedMaterialsService>(UsedMaterialsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
