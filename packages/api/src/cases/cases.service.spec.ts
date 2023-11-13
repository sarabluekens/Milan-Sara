import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { CasesService } from './cases.service'
import { Repository } from 'typeorm'
import { Case } from './entities/case.entity'

describe('CasesService', () => {
  let service: CasesService
  let mockCasesRepository: Repository<Case>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CasesService,
        {
          provide: getRepositoryToken(Case),
          useValue: {},
        },
      ],
    }).compile()

    service = module.get<CasesService>(CasesService)
    mockCasesRepository = module.get<Repository<Case>>(getRepositoryToken(Case))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
