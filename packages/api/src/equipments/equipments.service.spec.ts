import { Test, TestingModule } from '@nestjs/testing'
import { EquipmentsService } from './equipments.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Equipment } from './entities/equipment.entity'
import { Repository } from 'typeorm'
import {
  equipmentStub,
  createEquipmentInputStub,
} from './stubs/equipments.stub'
import { CasesService } from 'src/cases/cases.service'
import { CaregiversService } from 'src/caregivers/__mocks__/caregivers.service'
import { CreateEquipmentInput } from './dto/create-equipment.input'
import { caseStub } from 'src/cases/stubs/cases.stub'
import { Case } from 'src/cases/entities/case.entity'
import { Caregiver } from 'src/caregivers/entities/caregiver.entity'
import { caregiverStub } from 'src/caregivers/stubs/caregivers.stub'

describe('EquipmentsService', () => {
  let service: EquipmentsService
  let mockEquipmentsRepository: Repository<Equipment>
  let mockCasesRepository: Repository<Case>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EquipmentsService,
        {
          provide: getRepositoryToken(Equipment),
          useValue: {
            save: jest.fn().mockResolvedValue(equipmentStub()),
            find: jest.fn().mockResolvedValue([equipmentStub()]),
          },
        },
        CasesService,
        {
          provide: CasesService,
          useValue: {
            findOne: jest.fn().mockResolvedValue(caseStub()), // Hier moet nog uw caseStub komen
          },
        },
        // CaregiversService,
        // {
        //   provide: getRepositoryToken(Caregiver),
        //   useValue: {
        //     save: jest.fn().mockResolvedValue(caregiverStub()),
        //     find: jest.fn().mockResolvedValue([caregiverStub()]),
        //     findOne: jest.fn().mockResolvedValue(caregiverStub()),
        //   },
        // },
      ],
    }).compile()

    service = module.get<EquipmentsService>(EquipmentsService)
    mockEquipmentsRepository = module.get<Repository<Equipment>>(
      getRepositoryToken(Equipment),
    )
    // mockCasesRepository = module.get<Repository<Case>>(getRepositoryToken(Case))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    it('should call equipmentsRepository.save one time', async () => {
      const testEquipment = new Equipment()
      const saveSpy = jest.spyOn(mockEquipmentsRepository, 'save')

      await service.create(testEquipment)
      expect(saveSpy).toHaveBeenCalledTimes(1)
    })
    it("should call equipmentsRepository.save with the new equipment's parameters", async () => {
      const testEquipment: CreateEquipmentInput = createEquipmentInputStub()
      const saveSpy = jest.spyOn(mockEquipmentsRepository, 'save')

      await service.create(testEquipment)
      expect(saveSpy).toHaveBeenCalledWith(testEquipment)
    })
    it('should return the newly created equipment', async () => {
      const newEquipmentInput = createEquipmentInputStub()
      const newEquipment = equipmentStub()

      const result = await service.create(newEquipmentInput)
      expect(result).toEqual(newEquipment)
    })
  })

  // describe('findEquipmentByCaseId', () => {
  //   it('should call caseRepository.find one time', async () => {
  //     const findCaseSpy = jest.spyOn(mockCasesRepository, 'findOne')

  //     await service.getEquipmentByCaseId('657df9f4e880f11e1bceaa47')
  //     expect(findCaseSpy).toHaveBeenCalledTimes(1)
  //   })
  //   it('should call caseRepository.find with the caseId', async () => {
  //     const findCaseSpy = jest.spyOn(mockCasesRepository, 'findOne')
  //     await service.getEquipmentByCaseId('657df9f4e880f11e1bceaa47')
  //     expect(findCaseSpy).toHaveBeenCalledWith({
  //       caseId: '657df9f4e880f11e1bceaa47',
  //     })
  //   })

  //   it("should call equipmentsRepository.findOne with the case's id", async () => {
  //     const findOneSpy = jest.spyOn(mockEquipmentsRepository, 'find')

  //     await service.getEquipmentByCaseId('657df9f4e880f11e1bceaa47')
  //     expect(findOneSpy).toHaveBeenCalledWith({
  //       caseId: '657df9f4e880f11e1bceaa47',
  //     })
  //   })
  //   it('should return the equipment', async () => {
  //     const equipment = equipmentStub()

  //     const result = await service.getEquipmentByCaseId(
  //       '657df9f4e880f11e1bceaa47',
  //     )
  //     expect(result).toEqual([equipment])
  //   })
  // })
})
