import { Module } from '@nestjs/common';
import { CaregiversService } from './caregivers.service';
import { CaregiversResolver } from './caregivers.resolver';

@Module({
  providers: [CaregiversResolver, CaregiversService],
})
export class CaregiversModule {}
