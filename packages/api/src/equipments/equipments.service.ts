import { Injectable } from '@nestjs/common'
import { CreateEquipmentInput } from './dto/create-equipment.input'
import { UpdateEquipmentInput } from './dto/update-equipment.input'
import { InjectRepository } from '@nestjs/typeorm'
import { Equipment } from './entities/equipment.entity'
import { ObjectId, Repository } from 'typeorm'

@Injectable()
export class EquipmentsService {
  constructor(
    @InjectRepository(Equipment)
    private readonly equipmentRepository: Repository<Equipment>,
  ) {}

  create(createEquipmentInput: CreateEquipmentInput): Promise<Equipment> {
    try {
      const equipment = new Equipment()
      equipment.name = createEquipmentInput.name
      equipment.category = createEquipmentInput.category
      equipment.description = createEquipmentInput.description
      equipment.totalStock = createEquipmentInput.totalStock
      equipment.reservedStock = createEquipmentInput.reservedStock
      equipment.available = createEquipmentInput.available
      equipment.expirationDate = createEquipmentInput.expirationDate

      return this.equipmentRepository.save(equipment)
    } catch (error) {
      throw error
    }
  }

  findAll(uid?: string) {
    // if (uid) {
    //   return this.equipmentRepository.find({
    //     where: {userUid : uid }
    // })
    return this.equipmentRepository.find()
  }

  findOne(id: string) {
    //@ts-ignore
    return this.equipmentRepository.findOne({ _id: new ObjectId(id) })
  }

  update(id: number, updateEquipmentInput: UpdateEquipmentInput) {
    return `This action updates a #${id} equipment`
  }

  remove(id: number) {
    return `This action removes a #${id} equipment`
  }

  // logic for seeding
  saveAll(equipment: Equipment[]): Promise<Equipment[]> {
    return this.equipmentRepository.save(equipment)
  }

  truncate(): Promise<void> {
    return this.equipmentRepository.clear()
  }
}
