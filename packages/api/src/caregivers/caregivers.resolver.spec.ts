import { Test, TestingModule } from '@nestjs/testing';
import { CaregiversResolver } from './caregivers.resolver';
import { CaregiversService } from './caregivers.service';

describe('CaregiversResolver', () => {
  let resolver: CaregiversResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CaregiversResolver, CaregiversService],
    }).compile();

    resolver = module.get<CaregiversResolver>(CaregiversResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
