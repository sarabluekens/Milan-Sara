import { Test, TestingModule } from '@nestjs/testing'
import { CaregiversService } from './caregivers.service'
import { Repository } from 'typeorm'
import { Caregiver } from './entities/caregiver.entity'
import { getRepositoryToken } from '@nestjs/typeorm'

describe('CaregiversService', () => {
  let service: CaregiversService
  let mockCaregiversRepository: Repository<Caregiver>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CaregiversService,
        {
          provide: getRepositoryToken(Caregiver),
          useValue: {},
        },
      ],
    }).compile()

    service = module.get<CaregiversService>(CaregiversService)
    mockCaregiversRepository = module.get<Repository<Caregiver>>(
      getRepositoryToken(Caregiver),
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
