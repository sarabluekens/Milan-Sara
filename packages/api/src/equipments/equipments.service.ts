import { Injectable } from '@nestjs/common'
import { CreateEquipmentInput } from './dto/create-equipment.input'
import { UpdateEquipmentInput } from './dto/update-equipment.input'
import { InjectRepository } from '@nestjs/typeorm'
import { Equipment } from './entities/equipment.entity'
import { MongoRepository } from 'typeorm'
import { ObjectId } from 'mongodb'
import { CasesService } from 'src/cases/cases.service'
import { log } from 'console'

@Injectable()
export class EquipmentsService {
  constructor(
    @InjectRepository(Equipment)
    private readonly equipmentRepository: MongoRepository<Equipment>,
    private readonly casesService: CasesService,
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

  async update(id: string, updateEquipmentInput: UpdateEquipmentInput) {
    const equipment = await this.equipmentRepository.findOne({
      //@ts-ignore
      _id: new ObjectId(id),
    })

    equipment.name = updateEquipmentInput.name ?? equipment.name
    equipment.category = updateEquipmentInput.category ?? equipment.category
    equipment.description =
      updateEquipmentInput.description ?? equipment.description
    equipment.totalStock =
      updateEquipmentInput.totalStock ?? equipment.totalStock
    equipment.reservedStock =
      [...equipment.reservedStock, ...updateEquipmentInput.reservedStock] ??
      equipment.reservedStock
    equipment.available = updateEquipmentInput.available ?? equipment.available
    equipment.expirationDate =
      updateEquipmentInput.expirationDate ?? equipment.expirationDate
    return this.equipmentRepository.save(equipment)
  }

  async getEquipmentByCaseId(caseId: string) {
    const currentCase = await this.casesService.getCaseById(caseId)

    try {
      const eventId = currentCase.eventId
      console.log(typeof eventId)
      const equipment = await this.equipmentRepository.find({
        where: { 'reservedStock.eventId': eventId },
      })
      return equipment
    } catch (error) {
      throw error
    }
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
