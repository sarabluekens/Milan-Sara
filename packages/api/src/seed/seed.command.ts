import { Command } from 'nestjs-command'
import { Injectable } from '@nestjs/common'
import { SeedService } from './seed.service'

@Injectable()
export class DatabaseSeedCommand {
  constructor(private readonly seedService: SeedService) {}

  @Command({
    command: 'seed:database:caregivers',
    describe: 'Seed the database with caregivers',
  })
  async seedCaregivers() {
    console.info('⛑️ Start seeding of caregivers')
    const caregivers = await this.seedService.addCaregiversFromJson()
    console.info(`⛑️ ${caregivers.length} Caregivers are added`)
  }

  @Command({
    command: 'seed:reset:caregivers',
    describe: 'Delete all data from the caregivers table',
  })
  async delete() {
    console.info('🔪 Start deleting caregivers')
    await this.seedService.deleteAllCaregivers()
    console.info('🪶 Removed caregivers')
  }
}
