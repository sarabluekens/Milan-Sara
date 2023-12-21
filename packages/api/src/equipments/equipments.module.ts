import { Module } from '@nestjs/common'
import { EquipmentsService } from './equipments.service'
import { EquipmentsResolver } from './equipments.resolver'
import { Equipment } from './entities/equipment.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CasesModule } from 'src/cases/cases.module'
import { CaregiversModule } from 'src/caregivers/caregivers.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Equipment]),
    CasesModule,
    CaregiversModule,
  ],
  providers: [EquipmentsResolver, EquipmentsService],

  exports: [EquipmentsService],
})
export class EquipmentsModule {}
