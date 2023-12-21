import { Injectable } from '@nestjs/common'
import { CaregiversService } from 'src/caregivers/caregivers.service'
import { Caregiver } from 'src/caregivers/entities/caregiver.entity'
import * as caregivers from './data/caregivers.json'
import * as equipments from './data/equipments.json'
import * as events from './data/events.json'
import * as victims from './data/victims.json'
import { EquipmentsService } from 'src/equipments/equipments.service'
import { Equipment } from 'src/equipments/entities/equipment.entity'
import { Event } from 'src/events/entities/event.entity'
import { VictimsService } from 'src/victims/victims.service'
import { EventsService } from 'src/events/events.service'
import { Victim } from 'src/victims/entities/victim.entity'

export enum Status {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
  Completed = 'Completed',
}

@Injectable()
export class SeedService {
  constructor(
    private caregiversService: CaregiversService,
    private equipmentsService: EquipmentsService,
    private victimsService: VictimsService,
    private eventsService: EventsService,
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

      theCaregivers.push(b)
    }

    return this.caregiversService.saveAll(theCaregivers)
  }

  async deleteAllCaregivers(): Promise<void> {
    return this.caregiversService.truncate()
  }

  async addEquipmentFromJson(): Promise<Equipment[]> {
    let theEquipments: Equipment[] = []
    for (let equipment of equipments) {
      const b = new Equipment()
      b.name = equipment.name
      b.category = equipment.category
      b.description = equipment.description
      b.totalStock = equipment.totalStock
      b.reservedStock = equipment.reservedStock
      b.available = equipment.available
      b.expirationDate = new Date(equipment.expirationDate.$date)

      theEquipments.push(b)
    }

    return this.equipmentsService.saveAll(theEquipments)
  }

  async deleteAllEquipment(): Promise<void> {
    return this.equipmentsService.truncate()
  }

  async addEventsFromJson(): Promise<Event[]> {
    let theEvents: Event[] = []
    for (let event of events) {
      const b = new Event()
      b.name = event.name
      b.category = event.category
      b.address = event.address
      b.postalCode = event.postalCode
      b.city = event.city
      b.dates = event.dates.map(date => new Date(date.$date))
      b.startHour = event.startHour
      b.endHour = event.endHour
      b.contactPerson = event.contactPerson
      b.phoneNumber = event.phoneNumber
      b.email = event.email
      b.btwNumber = event.btwNumber
      b.eventWithChildren = event.eventWithChildren
      b.mapsLink = event.mapsLink
      b.mapCoords = event.mapCoords
      b.expectedVisitorStaffCount = event.expectedVisitorStaffCount
      b.status = event.status as Status

      theEvents.push(b)
    }

    return this.eventsService.saveAll(theEvents)
  }

  async deleteAllEvents(): Promise<void> {
    return this.eventsService.truncate()
  }

  async addVictimsFromJson(): Promise<Victim[]> {
    let theVictims: Victim[] = []
    for (let victim of victims) {
      const b = new Victim()
      b.firstName = victim.firstName
      b.lastName = victim.lastName
      b.email = victim.email
      b.phoneNumber = victim.phoneNumber
      b.cases = victim.cases

      theVictims.push(b)
    }

    return this.victimsService.saveAll(theVictims)
  }

  async deleteAllVictims(): Promise<void> {
    return this.eventsService.truncate()
  }
}
