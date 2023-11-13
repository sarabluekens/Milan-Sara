import { Test, TestingModule } from '@nestjs/testing'
import { EquipmentsService } from './equipments.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Equipment } from './entities/equipment.entity'
import { Repository } from 'typeorm'

describe('EquipmentsService', () => {
  let service: EquipmentsService
  let mockEquipmentsRepository: Repository<Equipment>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EquipmentsService,
        {
          provide: getRepositoryToken(Equipment),
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<EquipmentsService>(EquipmentsService)
    mockEquipmentsRepository = module.get<Repository<Equipment>>(
      getRepositoryToken(Equipment),
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
