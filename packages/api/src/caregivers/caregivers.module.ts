import { Module } from '@nestjs/common'
import { CaregiversService } from './caregivers.service'
import { CaregiversResolver } from './caregivers.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Caregiver } from './entities/caregiver.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Caregiver])],
  providers: [CaregiversResolver, CaregiversService],

  exports: [CaregiversService],
})
export class CaregiversModule {}
 