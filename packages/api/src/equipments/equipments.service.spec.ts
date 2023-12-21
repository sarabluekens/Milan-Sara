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
import { CreateEquipmentInput } from './dto/create-equipment.input'

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
            save: jest.fn().mockResolvedValue(equipmentStub()),
            findOne: jest.fn().mockResolvedValue(equipmentStub()),
          },
        },
        CasesService,
        {
          provide: CasesService,
          useValue: {
            findOne: jest.fn().mockResolvedValue(equipmentStub()), // Hier moet nog uw caseStub komen
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

  describe('findOneByCaseId', () => {
    it('should call equipmentsRepository.findOne one time', async () => {
      const findOneSpy = jest.spyOn(mockEquipmentsRepository, 'findOne')

      await service.getEquipmentByCaseId('657df9f4e880f11e1bceaa47')
      expect(findOneSpy).toHaveBeenCalledTimes(1)
    })
    it("should call equipmentsRepository.findOne with the case's id", async () => {
      const findOneSpy = jest.spyOn(mockEquipmentsRepository, 'findOne')

      await service.getEquipmentByCaseId('657df9f4e880f11e1bceaa47')
      expect(findOneSpy).toHaveBeenCalledWith({
        caseId: '657df9f4e880f11e1bceaa47',
      })
    })
    it('should return the equipment', async () => {
      const equipment = equipmentStub()

      const result = await service.getEquipmentByCaseId(
        '657df9f4e880f11e1bceaa47',
      )
      expect(result).toEqual(equipment)
    })
  })
})
