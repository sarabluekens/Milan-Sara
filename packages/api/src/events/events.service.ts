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

  findAllByStatusAndClient(status: Status, contactPerson: string) {
    return this.eventRepository.find({ where: { status, contactPerson } })
  }

  findAllByStatus(status: Status) {
    return this.eventRepository.find({ where: { status } })
  }

  findOne(id: string) {
    //@ts-ignore
    return this.eventRepository.findOneBy({ _id: new ObjectId(id) })
  }

  update(id: number, updateEventInput: UpdateEventInput) {
    return `This action updates a #${id} event`
  }

  remove(id: number) {
    return `This action removes a #${id} event`
  }
}
