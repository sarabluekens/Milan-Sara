import { equipmentStub } from '../stubs/equipments.stub'

export const EquipmentsService = jest.fn().mockReturnValue({
  findOneByCaseId: jest.fn().mockResolvedValue(equipmentStub()),
  create: jest.fn().mockResolvedValue(equipmentStub()),
})
