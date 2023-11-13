import { Test, TestingModule } from '@nestjs/testing'
import { EventsService } from './events.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Event } from './entities/event.entity'

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
            save: jest.fn(),
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
})
