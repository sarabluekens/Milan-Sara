import { Module } from '@nestjs/common'
import { VictimsService } from './victims.service'
import { VictimsResolver } from './victims.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Victim } from './entities/victim.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Victim])],
  providers: [VictimsResolver, VictimsService],
  exports: [VictimsService],
})
export class VictimsModule {}
