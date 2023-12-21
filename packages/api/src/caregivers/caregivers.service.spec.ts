import { Test, TestingModule } from '@nestjs/testing'
import { CaregiversService } from './caregivers.service'
import { Repository } from 'typeorm'
import { Caregiver } from './entities/caregiver.entity'
import { getRepositoryToken } from '@nestjs/typeorm'
import { CreateCaregiverInput } from './dto/create-caregiver.input'
import {
  updateCaregiverInputStub,
  caregiverStub,
  createCaregiverInputStub,
} from './stubs/caregivers.stub'
import { UpdateCaregiverInput } from './dto/update-caregiver.input'

describe('CaregiversService', () => {
  let service: CaregiversService
  let mockCaregiversRepository: Repository<Caregiver>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CaregiversService,
        {
          provide: getRepositoryToken(Caregiver),
          useValue: {
            save: jest.fn().mockResolvedValue(caregiverStub()),
            update: jest.fn().mockResolvedValue([caregiverStub()]),
            findOne: jest.fn().mockResolvedValue(caregiverStub()),
          },
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

  describe('create', () => {
    describe('when create caregiver is called', () => {
      it('should call caregiverRepository.save one time', async () => {
        const testCaregiver = new Caregiver()
        const saveSpy = jest.spyOn(mockCaregiversRepository, 'save')

        await service.create(testCaregiver)
        expect(saveSpy).toHaveBeenCalledTimes(1)
      })
      it('should call caregiverRepository.save with the correct parameters', async () => {
        const testCaregiver: CreateCaregiverInput = createCaregiverInputStub()
        const saveSpy = jest.spyOn(mockCaregiversRepository, 'save')

        await service.create(testCaregiver)
        expect(saveSpy).toHaveBeenCalledWith(testCaregiver)
      })

      it('should return the newly created caregiver', async () => {
        const newCaregiverInput = createCaregiverInputStub()
        const newCaregiverOutput = caregiverStub()
        const result = await service.create(newCaregiverInput)
        expect(result).toEqual(newCaregiverOutput)
      })
    })
  })

  describe('updateJobs', () => {
    describe('when updateJobs is called', () => {
      it('should call caregiverRepository.findOne one time', async () => {
        const caregiverId = '123'
        const testCaregiver: UpdateCaregiverInput = updateCaregiverInputStub()
        const findOneSpy = jest.spyOn(mockCaregiversRepository, 'findOne')

        await service.updateJobs(caregiverId, testCaregiver)
        expect(findOneSpy).toHaveBeenCalledTimes(1)
      })

      it('should call caregiverRepository.update one time', async () => {
        const caregiverId = '123'
        const testCaregiver: UpdateCaregiverInput = updateCaregiverInputStub()
        const updateSpy = jest.spyOn(mockCaregiversRepository, 'update')

        await service.updateJobs(caregiverId, testCaregiver)
        expect(updateSpy).toHaveBeenCalledTimes(1)
      })

      it('should call caregiverRepository.update with the correct parameters', async () => {
        const caregiverId = '123'
        const testCaregiver: UpdateCaregiverInput = updateCaregiverInputStub()
        const updateSpy = jest.spyOn(mockCaregiversRepository, 'update')

        await service.updateJobs(caregiverId, testCaregiver)
        expect(updateSpy).toHaveBeenCalledWith(caregiverId, caregiverStub())
      })

      it('should return the updated caregiver', async () => {
        const caregiverId = '123'
        const testCaregiver: UpdateCaregiverInput = updateCaregiverInputStub()
        const result = await service.updateJobs(caregiverId, testCaregiver)
        expect(result).toEqual(caregiverStub())
      })
    })
  })
})
