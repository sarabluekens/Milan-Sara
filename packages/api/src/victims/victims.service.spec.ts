import { Test, TestingModule } from '@nestjs/testing'
import { VictimsService } from './victims.service'
import { Repository } from 'typeorm'
import { Victim } from './entities/victim.entity'
import { getRepositoryToken } from '@nestjs/typeorm'

describe('VictimsService', () => {
  let service: VictimsService
  let mockVictimsRepository: Repository<Victim>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VictimsService,
        {
          provide: getRepositoryToken(Victim),
          useValue: {},
        },
      ],
    }).compile()

    service = module.get<VictimsService>(VictimsService)
    mockVictimsRepository = module.get<Repository<Victim>>(
      getRepositoryToken(Victim),
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
