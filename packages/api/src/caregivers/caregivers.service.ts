import { Injectable } from '@nestjs/common'
import { CreateCaregiverInput } from './dto/create-caregiver.input'
import { UpdateCaregiverInput } from './dto/update-caregiver.input'
import { Caregiver } from './entities/caregiver.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class CaregiversService {
  constructor(
    @InjectRepository(Caregiver)
    private readonly caregiverRepository: Repository<Caregiver>,
  ) {}

  create(createCaregiverInput: CreateCaregiverInput): Promise<Caregiver> {
    const c = new Caregiver()
    c.name = createCaregiverInput.name
    c.fullname = createCaregiverInput.fullname
    c.category = createCaregiverInput.category
    c.description = createCaregiverInput.description
    c.available = createCaregiverInput.available

    return this.caregiverRepository.save(c)
  }

  findAll() {
    return this.caregiverRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} caregiver`
  }

  update(id: number, updateCaregiverInput: UpdateCaregiverInput) {
    return `This action updates a #${id} caregiver`
  }

  remove(id: number) {
    return `This action removes a #${id} caregiver`
  }
}
