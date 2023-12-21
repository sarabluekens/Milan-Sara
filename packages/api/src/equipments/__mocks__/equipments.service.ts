import { equipmentStub } from '../stubs/equipments.stub'

export const EquipmentsService = jest.fn().mockReturnValue({
  equipmentByCaseId: jest.fn().mockResolvedValue([equipmentStub()]),
  create: jest.fn().mockResolvedValue(equipmentStub()),
})
