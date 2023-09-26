import { Injectable } from '@nestjs/common'
import { CaregiversService } from 'src/caregivers/caregivers.service'
import { Caregiver } from 'src/caregivers/entities/caregiver.entity'
import * as caregivers from './data/caregivers.json'

@Injectable()
export class SeedService {
  constructor(private caregiversService: CaregiversService) {}

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
}
