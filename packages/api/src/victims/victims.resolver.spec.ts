import { Test, TestingModule } from '@nestjs/testing';
import { VictimsResolver } from './victims.resolver';
import { VictimsService } from './victims.service';

describe('VictimsResolver', () => {
  let resolver: VictimsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VictimsResolver, VictimsService],
    }).compile();

    resolver = module.get<VictimsResolver>(VictimsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
