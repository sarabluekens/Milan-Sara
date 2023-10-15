import { Command } from 'nestjs-command'
import { Injectable } from '@nestjs/common'
import { SeedService } from './seed.service'

@Injectable()
export class DatabaseSeedCommand {
  constructor(private readonly seedService: SeedService) {}

  //   seeding for caregivers
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
  /*   @Command({
    command: 'seed:database:equipments',
    describe: 'Seed the database with equipment',
  })
  async seedEquipment() {
    console.info('🚑 Start seeding of equipment')
    const equipment = await this.seedService.addEquipmentFromJson()
    console.info(`🚑 ${equipment.length} Equipment are added`)
  } */

  @Command({
    command: 'seed:reset:equipments',
    describe: 'Delete all data from the equipment table',
  })
  async deleteEquipment() {
    console.info('🔪 Start deleting equipment')
    await this.seedService.deleteAllEquipment()
    console.info('🪶 Removed equipment')
  }
}
