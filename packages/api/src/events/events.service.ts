import { Injectable } from '@nestjs/common'
import { CreateEventInput } from './dto/create-event.input'
import { UpdateEventInput } from './dto/update-event.input'
import { Event, Status } from './entities/event.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ObjectId } from 'mongodb'

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  create(createEventInput: CreateEventInput): Promise<Event> {
    console.log(createEventInput)
    try {
      const e = new Event()
      e.name = createEventInput.name
      e.category = createEventInput.category
      e.address = createEventInput.address
      e.postalCode = createEventInput.postalCode
      e.city = createEventInput.city
      e.dates = createEventInput.dates
      e.startHour = createEventInput.startHour
      e.endHour = createEventInput.endHour
      e.contactPerson = createEventInput.contactPerson
      e.phoneNumber = createEventInput.phoneNumer
      e.email = createEventInput.email
      e.btwNumber = createEventInput.btwNumber
      e.eventWithChildren = createEventInput.eventWithChildren
      e.mapsLink = createEventInput.mapsLink
      e.mapCoords = createEventInput.mapCoords
      e.expectedVisitorStaffCount = createEventInput.expectedVisitorStaffCount
      e.status = Status.Pending

      return this.eventRepository.save(e)
    } catch (error) {
      throw error
    }
  }

  findAll() {
    return this.eventRepository.find()
  }

  findAllByStatusAndClient(status: Status, email: string) {
    return this.eventRepository.find({ where: { status, email } })
  }

  findAllByStatus(status: Status) {
    return this.eventRepository.find({ where: { status } })
  }

  findOne(id: string) {
    //@ts-ignore
    return this.eventRepository.findOneBy({ _id: new ObjectId(id) })
  }

  async update(id: string, updateEventInput: UpdateEventInput) {
    const event = await this.eventRepository.findOne({
      //@ts-ignore
      _id: new ObjectId(id),
    })

    event.name = updateEventInput.name ?? event.name
    event.category = updateEventInput.category ?? event.category
    event.address = updateEventInput.address ?? event.address
    event.postalCode = updateEventInput.postalCode ?? event.postalCode
    event.city = updateEventInput.city ?? event.city
    event.dates = updateEventInput.dates ?? event.dates
    event.startHour = updateEventInput.startHour ?? event.startHour
    event.endHour = updateEventInput.endHour ?? event.endHour
    event.contactPerson = updateEventInput.contactPerson ?? event.contactPerson
    event.phoneNumber = updateEventInput.phoneNumer ?? event.phoneNumber
    event.email = updateEventInput.email ?? event.email
    event.btwNumber = updateEventInput.btwNumber ?? event.btwNumber
    event.eventWithChildren =
      updateEventInput.eventWithChildren ?? event.eventWithChildren
    event.mapsLink = updateEventInput.mapsLink ?? event.mapsLink
    event.mapCoords = updateEventInput.mapCoords ?? event.mapCoords
    event.expectedVisitorStaffCount =
      updateEventInput.expectedVisitorStaffCount ??
      event.expectedVisitorStaffCount
    event.status = updateEventInput.status ?? event.status
    return this.eventRepository.save(event)
  }

  remove(id: number) {
    return `This action removes a #${id} event`
  }
}
