import { Module } from '@nestjs/common'
import { CaregiversModule } from 'src/caregivers/caregivers.module'

import { CommandModule } from 'nestjs-command'
import { EquipmentsModule } from 'src/equipments/equipments.module'
import { SeedService } from './seed.service'
import { DatabaseSeedCommand } from './seed.command'
@Module({
  imports: [CaregiversModule, EquipmentsModule, CommandModule],
  providers: [DatabaseSeedCommand, SeedService],
})
export class SeedModule {}
