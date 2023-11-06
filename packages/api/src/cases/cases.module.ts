import { Module } from '@nestjs/common'
import { CasesService } from './cases.service'
import { CasesResolver } from './cases.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Case } from './entities/case.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Case])],
  providers: [CasesResolver, CasesService],

  exports: [CasesService],
})
export class CasesModule {}
