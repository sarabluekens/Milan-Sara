import { Module } from '@nestjs/common'
import { CasesService } from './cases.service'
import { CasesResolver } from './cases.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Case } from './entities/case.entity'
import { Caregiver } from 'src/caregivers/entities/caregiver.entity'
import { CaregiversModule } from 'src/caregivers/caregivers.module'

@Module({
  imports: [TypeOrmModule.forFeature([Case]), CaregiversModule], //allows to injectrepository into service for entity case
  providers: [CasesResolver, CasesService],

  exports: [CasesService],
})
export class CasesModule {}
