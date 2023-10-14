import { Injectable } from '@nestjs/common'
import { CaregiversService } from 'src/caregivers/caregivers.service'
import { Caregiver } from 'src/caregivers/entities/caregiver.entity'
import * as caregivers from './data/caregivers.json'
// import * as equipments from './data/equipments.json'
import { EquipmentsService } from 'src/equipments/equipments.service'
import { Equipment } from 'src/equipments/entities/equipment.entity'

@Injectable()
export class SeedService {
  constructor(
    private caregiversService: CaregiversService,
    private equipmentsService: EquipmentsService,
  ) {}

  async addCaregiversFromJson(): Promise<Caregiver[]> {
    let theCaregivers: Caregiver[] = []
    for (let caregiver of caregivers) {
      const b = new Caregiver()
      b.name = caregiver.name
      b.fullname = caregiver.fullname
      b.category = caregiver.category
      b.description = caregiver.description

      theCaregivers.push(b)
    }

    return this.caregiversService.saveAll(theCaregivers)
  }

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
