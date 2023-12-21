import { CreateEquipmentInput } from '../dto/create-equipment.input'
import { Equipment } from '../entities/equipment.entity'

export const createEquipmentInputStub = (): CreateEquipmentInput => {
  const newEquipment = new CreateEquipmentInput()
  newEquipment.name = 'Equipment 1'
  newEquipment.category = 'Category'
  newEquipment.description = 'Description'
  newEquipment.totalStock = 10
  newEquipment.reservedStock = [{ eventId: '1', amount: 5 }]
  newEquipment.available = true
  newEquipment.expirationDate = new Date('2023-12-21T23:00:00.000+00:00')

  return newEquipment
}

export const equipmentStub = (): Equipment => {
  const newEquipment = new Equipment()
  newEquipment.id = '1'
  newEquipment.name = 'Equipment 1'
  newEquipment.category = 'Category'
  newEquipment.description = 'Description'
  newEquipment.totalStock = 10
  newEquipment.reservedStock = [{ eventId: '1', amount: 5 }]
  newEquipment.available = true
  newEquipment.expirationDate = new Date('2023-12-21T23:00:00.000+00:00')

  return newEquipment
}
