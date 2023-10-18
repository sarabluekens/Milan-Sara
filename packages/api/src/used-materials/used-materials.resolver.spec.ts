import { Test, TestingModule } from '@nestjs/testing';
import { UsedMaterialsResolver } from './used-materials.resolver';
import { UsedMaterialsService } from './used-materials.service';

describe('UsedMaterialsResolver', () => {
  let resolver: UsedMaterialsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsedMaterialsResolver, UsedMaterialsService],
    }).compile();

    resolver = module.get<UsedMaterialsResolver>(UsedMaterialsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
