import { Command } from 'nestjs-command'
import { Injectable } from '@nestjs/common'
import { SeedService } from './seed.service'
import { command } from 'yargs'

@Injectable()
export class DatabaseSeedCommand {
  constructor(private readonly seedService: SeedService) {}

  //seeding for caregivers
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
  async deleteCaregivers() {
    console.info('🔪 Start deleting caregivers')
    await this.seedService.deleteAllCaregivers()
    console.info('🪶 Removed caregivers')
  }

  //   seeding for equipments
  @Command({
    command: 'seed:database:equipments',
    describe: 'Seed the database with equipment',
  })
  async seedEquipment() {
    console.info('🚑 Start seeding of equipment')
    const equipment = await this.seedService.addEquipmentFromJson()
    console.info(`🚑 ${equipment.length} Equipment are added`)
  }

  @Command({
    command: 'seed:reset:equipments',
    describe: 'Delete all data from the equipment table',
  })
  async deleteEquipment() {
    console.info('🔪 Start deleting equipment')
    await this.seedService.deleteAllEquipment()
    console.info('🪶 Removed equipment')
  }

  // seeding for events
  @Command({
    command: 'seed:database:events',
    describe: 'Seed the database with events',
  })
  async seedEvents() {
    console.info('🎉 Start seeding of events')
    const event = await this.seedService.addEventsFromJson()
    console.info(`🎉 ${event.length} Events are added`)
  }

  @Command({
    command: 'seed:reset:events',
    describe: 'Delete all data from the events table',
  })
  async deleteEvents() {
    console.info('🔪 Start deleting events')
    await this.seedService.deleteAllEvents()
    console.info('🪶 Removed events')
  }

  // seeding for victims
  @Command({
    command: 'seed:database:victims',
    describe: 'Seed the database with victims',
  })
  async seedVictims() {
    console.info('👶 Start seeding of victims')
    const victim = await this.seedService.addVictimsFromJson()
    console.info(`👶 ${victim.length} Victims are added`)
  }

  @Command({
    command: 'seed:reset:victims',
    describe: 'Delete all data from the victims table',
  })
  async deleteVictims() {
    console.info('🔪 Start deleting victims')
    await this.seedService.deleteAllVictims()
    console.info('🪶 Removed victims')
  }
}
