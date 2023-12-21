import { Test, TestingModule } from '@nestjs/testing'
import { EventsService } from './events.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Event } from './entities/event.entity'
import { CreateEventInput } from './dto/create-event.input'
import { eventStub, createEventInputStub } from './stubs/events.stub'

describe('EventsService', () => {
  let service: EventsService
  let mockEventsRepository: Repository<Event>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: getRepositoryToken(Event),
          useValue: {
            save: jest.fn().mockResolvedValue(eventStub()),
            find: jest.fn().mockResolvedValue([eventStub()]),
          },
        },
      ],
    }).compile()

    service = module.get<EventsService>(EventsService)
    mockEventsRepository = module.get<Repository<Event>>(
      getRepositoryToken(Event),
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    it('should call eventsRepository.save one time', async () => {
      const testEvent = new Event()
      const saveSpy = jest.spyOn(mockEventsRepository, 'save')

      await service.create(testEvent)
      expect(saveSpy).toHaveBeenCalledTimes(1)
    })
    it("should call eventsRepository.save with the new event's parameters", async () => {
      const testEvent: CreateEventInput = createEventInputStub()
      const saveSpy = jest.spyOn(mockEventsRepository, 'save')

      await service.create(testEvent)
      expect(saveSpy).toHaveBeenCalledWith(testEvent)
    })
    it('should return the newly created event', async () => {
      const newEventInput = createEventInputStub()
      const newEventOutput = eventStub()

      const result = await service.create(newEventInput)
      expect(result).toEqual(newEventOutput)
    })
  })

  describe('findAllByDate', () => {
    it('should call eventsRepository.findAllByDate one time', async () => {
      const findSpy = jest.spyOn(mockEventsRepository, 'find')
      await service.findAllByDate()
      expect(findSpy).toHaveBeenCalledTimes(1)
    })
    it('should return an array of events', async () => {
      const result = await service.findAllByDate()
      expect(result).toEqual([eventStub()])
    })
  })
})
