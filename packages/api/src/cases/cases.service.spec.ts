import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { CasesService } from './cases.service'
import { Repository } from 'typeorm'

import { Case } from './entities/case.entity'
import { CreateCaseInput } from './dto/create-case.input'
import { caseStub, createCaseInputStub } from './stubs/cases.stub'
import { caregiverStub } from './../caregivers/stubs/caregivers.stub'
import { Caregiver } from 'src/caregivers/entities/caregiver.entity'
import { CaregiversService } from 'src/caregivers/caregivers.service'

describe('CasesService', () => {
  let service: CasesService
  let mockCaseRepository: Repository<Case>
  let mockCaregiversRepository: Repository<Caregiver>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CasesService,
        {
          provide: getRepositoryToken(Case),
          useValue: {
            save: jest.fn().mockResolvedValue(caseStub()),
            find: jest.fn().mockResolvedValue([caseStub()]),
            findOne: jest.fn().mockResolvedValue(caseStub()),
          },
        },
        CaregiversService,
        {
          provide: getRepositoryToken(Caregiver),
          useValue: {
            save: jest.fn().mockResolvedValue(caregiverStub()),
            find: jest.fn().mockResolvedValue([caregiverStub()]),
            findOne: jest.fn().mockResolvedValue(caregiverStub()),
          },
        },
      ],
    }).compile()

    service = module.get<CasesService>(CasesService)
    mockCaseRepository = module.get<Repository<Case>>(getRepositoryToken(Case))
    mockCaregiversRepository = module.get<Repository<Caregiver>>(
      getRepositoryToken(Caregiver),
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    describe('when create case is called', () => {
      it('should call caseRepository.save one time', async () => {
        const testCase = new Case()
        const saveSpy = jest.spyOn(mockCaseRepository, 'save')

        await service.create(testCase)
        expect(saveSpy).toHaveBeenCalledTimes(1)
      })
      it("should call caseRepository.save with the new case's parameters", async () => {
        const testCase: CreateCaseInput = createCaseInputStub()
        const saveSpy = jest.spyOn(mockCaseRepository, 'save')

        await service.create(testCase)
        expect(saveSpy).toHaveBeenCalledWith(testCase)
      })
      it('should return the newly created case', async () => {
        const newCaseInput = createCaseInputStub()
        const newCaseOutput = caseStub()

        const result = await service.create(newCaseInput)
        expect(result).toEqual(newCaseOutput)
      })
    })
  })

  describe('getCasesforCaregiverToday', () => {
    describe('when getCasesforCaregiverToday is called', () => {
      it('should call caregiverRepository.find one time', async () => {
        const findCaregiverSpy = jest.spyOn(mockCaregiversRepository, 'findOne')

        await service.findCasesForCaregiverToday('1')
        expect(findCaregiverSpy).toHaveBeenCalledTimes(1)
      })
      it('should call caseRepository.find with the correct parameters', async () => {
        const findCaseSpy = jest.spyOn(mockCaseRepository, 'find')

        await service.findAllByEventId('1')
        expect(findCaseSpy).toHaveBeenCalledWith({
          where: { eventId: '1', status: 'pending' },
        })
      })
      it('should return the cases for the caregiver', async () => {
        const result = await service.findAllByEventId('1')
        expect(result).toEqual([caseStub()])
      })
    })
  })
})
