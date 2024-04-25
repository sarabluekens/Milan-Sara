import { Module } from '@nestjs/common'
import { CaregiversModule } from 'src/caregivers/caregivers.module'

import { CommandModule } from 'nestjs-command'
import { EquipmentsModule } from 'src/equipments/equipments.module'
import { SeedService } from './seed.service'
import { DatabaseSeedCommand } from './seed.command'
import { VictimsModule } from 'src/victims/victims.module'
import { CasesModule } from 'src/cases/cases.module'
import { EventsModule } from 'src/events/events.module'
import { UsersModule } from 'src/users/users.module'
@Module({
  imports: [
    CaregiversModule,
    EquipmentsModule,
    EventsModule,
    VictimsModule,
    CommandModule,
    CasesModule,
    UsersModule,
  ],
  providers: [DatabaseSeedCommand, SeedService],
})
export class SeedModule {}
