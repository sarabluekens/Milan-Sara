import { Test, TestingModule } from '@nestjs/testing';
import { CasesResolver } from './cases.resolver';
import { CasesService } from './cases.service';

describe('CasesResolver', () => {
  let resolver: CasesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CasesResolver, CasesService],
    }).compile();

    resolver = module.get<CasesResolver>(CasesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
