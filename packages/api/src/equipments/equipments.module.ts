import { Module } from '@nestjs/common'
import { EquipmentsService } from './equipments.service'
import { EquipmentsResolver } from './equipments.resolver'
import { Equipment } from './entities/equipment.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([Equipment])],
  providers: [EquipmentsResolver, EquipmentsService],

  exports: [EquipmentsService],
})
export class EquipmentsModule {}
