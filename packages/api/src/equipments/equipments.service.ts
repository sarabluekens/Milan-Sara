import { Injectable } from '@nestjs/common'
import { CreateEquipmentInput } from './dto/create-equipment.input'
import { UpdateEquipmentInput } from './dto/update-equipment.input'
import { InjectRepository } from '@nestjs/typeorm'
import { Equipment } from './entities/equipment.entity'
import { Repository } from 'typeorm'

@Injectable()
export class EquipmentsService {
  constructor(
    @InjectRepository(Equipment)
    private readonly equipmentRepository: Repository<Equipment>,
  ) {}

  create(createEquipmentInput: CreateEquipmentInput): Promise<Equipment> {
    const equipment = new Equipment()
    equipment.name = createEquipmentInput.name
    equipment.fullname = createEquipmentInput.fullname
    equipment.category = createEquipmentInput.category
    equipment.amount = createEquipmentInput.amount
    equipment.available = createEquipmentInput.available

    return this.equipmentRepository.save(equipment)
  }

  findAll() {
    return this.equipmentRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} equipment`
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
