import { Test, TestingModule } from '@nestjs/testing'
import { EquipmentsResolver } from './equipments.resolver'
import { CreateEquipmentInput } from './dto/create-equipment.input'
import { equipmentStub } from './stubs/equipments.stub'
import { Equipment } from './entities/equipment.entity'

import { EquipmentsService } from './equipments.service'
import { CasesService } from 'src/cases/cases.service'
import { CasesResolver } from 'src/cases/cases.resolver'
jest.mock('./equipments.service')
jest.mock('src/cases/cases.service')

describe('EquipmentsResolver', () => {
  let resolver: EquipmentsResolver

  let mockedService: EquipmentsService
  // let mockedCasesService: CasesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquipmentsResolver, EquipmentsService], // CasesService]
    }).compile()

    resolver = module.get<EquipmentsResolver>(EquipmentsResolver)
    mockedService = module.get<EquipmentsService>(EquipmentsService)
    // mockedCasesService = module.get<CasesService>(CasesService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  describe('createEquipment', () => {
    let equipmentDTO: CreateEquipmentInput
    let resultEquipment: Equipment

    beforeEach(async () => {
      equipmentDTO = {
        name: equipmentStub().name,
        category: equipmentStub().category,
        description: equipmentStub().description,
        totalStock: equipmentStub().totalStock,
        reservedStock: equipmentStub().reservedStock,
        available: equipmentStub().available,
        expirationDate: equipmentStub().expirationDate,
      }
      console.log(equipmentDTO)
      resultEquipment = await resolver.createEquipment(equipmentDTO)
    })

    it('should call service.createEquipment one time', async () => {
      expect(mockedService.create).toHaveBeenCalledTimes(1)
    })

    it('should call service.createEquipment with the correct arguments', async () => {
      expect(mockedService.create).toHaveBeenCalledWith(equipmentDTO)
    })

    it('should return the correct result', async () => {
      expect(resultEquipment).toEqual(equipmentStub())
    })
  })

  // describe('findEquipmentByCaseId', () => {
  //   let resultEquipment = []

  //   beforeEach(async () => {
  //     resultEquipment = await resolver.findEquipmentByCaseId(
  //       '657df9f4e880f11e1bceaa47',
  //     )
  //   })

  //   it('should call service.findEquipmentByCaseId one time', async () => {
  //     expect(mockedService.getEquipmentByCaseId).toHaveBeenCalledTimes(1)
  //   })

  //   it('should call service.findEquipmentByCaseId with the correct arguments', async () => {
  //     expect(mockedService.getEquipmentByCaseId).toHaveBeenCalledWith(
  //       '657df9f4e880f11e1bceaa47',
  //     )
  //   })

  //   it('should return the correct result', async () => {
  //     expect(resultEquipment).toEqual([equipmentStub()])
  //   })
  // })
})
