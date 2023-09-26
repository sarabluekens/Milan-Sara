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

  create(createEquipmentInput: CreateEquipmentInput) {
    return 'This action adds a new equipment'
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
}
