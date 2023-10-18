import { Injectable } from '@nestjs/common'
import { CaregiversService } from 'src/caregivers/caregivers.service'
import { Caregiver } from 'src/caregivers/entities/caregiver.entity'
import * as caregivers from './data/caregivers.json'
// import * as equipments from './data/equipments.json'
import { EquipmentsService } from 'src/equipments/equipments.service'
import { Equipment } from 'src/equipments/entities/equipment.entity'
import { VictimsService } from 'src/victims/victims.service'
import { UsedMaterialsService } from 'src/used-materials/used-materials.service'

@Injectable()
export class SeedService {
  constructor(
    private caregiversService: CaregiversService,
    private equipmentsService: EquipmentsService,
    private vicrimsService: VictimsService,
    private usedMaterialsService: UsedMaterialsService,
  ) {}

  async addCaregiversFromJson(): Promise<Caregiver[]> {
    let theCaregivers: Caregiver[] = []
    for (let caregiver of caregivers) {
      const b = new Caregiver()
      b.firstName = caregiver.name
      b.lastName = caregiver.fullname
      b.profession = caregiver.category
      b.availableForEvent = caregiver.availableForEvent
      b.availableForNewCase = caregiver.availableForNewCase

  //     theCaregivers.push(b)
  //   }

  //   return this.caregiversService.saveAll(theCaregivers)
  // }

  async deleteAllCaregivers(): Promise<void> {
    return this.caregiversService.truncate()
  }

  /*   async addEquipmentFromJson(): Promise<Equipment[]> {
    let theEquipments: Equipment[] = []
    for (let equipment of equipments) {
      const b = new Equipment()
      b.name = equipment.name
      b.category = equipment.category
      b.description = equipment.description
      b.totalStock = equipment.totalStock
      b.reservedStock = equipment.reservedStock
      b.available = equipment.available
      b.expirationDate = equipment.expirationDate

      theEquipments.push(b)
    }

    return this.equipmentsService.saveAll(theEquipments)
  } */

  async deleteAllEquipment(): Promise<void> {
    return this.equipmentsService.truncate()
  }
}
