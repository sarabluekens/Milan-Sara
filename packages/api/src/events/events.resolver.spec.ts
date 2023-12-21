import { Test, TestingModule } from '@nestjs/testing'
import { EventsResolver } from './events.resolver'
import { CreateEventInput } from './dto/create-event.input'
import { eventStub } from './stubs/events.stub'
import { Event } from './entities/event.entity'

import { EventsService } from './events.service'
jest.mock('./events.service')

describe('EventsResolver', () => {
  let resolver: EventsResolver
  let mockedService: EventsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventsResolver, EventsService],
    }).compile()

    resolver = module.get<EventsResolver>(EventsResolver)
    mockedService = module.get<EventsService>(EventsService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  describe('createEvent', () => {
    let eventDTO: CreateEventInput
    let resultEvent: Event

    beforeEach(async () => {
      eventDTO = {
        name: eventStub().name,
        category: eventStub().category,
        address: eventStub().address,
        postalCode: eventStub().postalCode,
        city: eventStub().city,
        dates: eventStub().dates,
        startHour: eventStub().startHour,
        endHour: eventStub().endHour,
        contactPerson: eventStub().contactPerson,
        phoneNumber: eventStub().phoneNumber,
        email: eventStub().email,
        btwNumber: eventStub().btwNumber,
        eventWithChildren: eventStub().eventWithChildren,
        expectedVisitorStaffCount: eventStub().expectedVisitorStaffCount,
        mapsLink: eventStub().mapsLink,
        mapCoords: eventStub().mapCoords,
        status: eventStub().status,
      }
      resultEvent = await resolver.createEvent(eventDTO)
    })

    it('should call service.createEvent one time', async () => {
      expect(mockedService.create).toHaveBeenCalledTimes(1)
    })

    it('should call service.createEvent with the correct arguments', async () => {
      expect(mockedService.create).toHaveBeenCalledWith(eventDTO)
    })

    it('should return the correct result', async () => {
      expect(resultEvent).toEqual(eventStub())
    })
  })

  describe('findAllByDate', () => {
    let resultEvents = []

    beforeEach(async () => {
      resultEvents = await resolver.findAllToday()
    })

    it('should call service.findAllByDate one time', async () => {
      expect(mockedService.findAllByDate).toHaveBeenCalledTimes(1)
    })

    it('should return the correct result', async () => {
      expect(resultEvents).toEqual([eventStub()])
    })
  })
})
