import { Injectable } from '@nestjs/common'
import { CreateCaregiverInput } from './dto/create-caregiver.input'
import { UpdateCaregiverInput } from './dto/update-caregiver.input'
import { Caregiver } from './entities/caregiver.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { ObjectId, Repository } from 'typeorm'

@Injectable()
export class CaregiversService {
  constructor(
    @InjectRepository(Caregiver)
    private readonly caregiverRepository: Repository<Caregiver>,
  ) {}

  create(createCaregiverInput: CreateCaregiverInput): Promise<Caregiver> {
    const c = new Caregiver()
    c.firstName = createCaregiverInput.firstName
    c.lastName = createCaregiverInput.lastName
    c.profession = createCaregiverInput.profession
    c.availableForEvent = createCaregiverInput.availableForEvent
    c.availableForNewCase = createCaregiverInput.availableForNewCase

    return this.caregiverRepository.save(c)
  }

  findAll() {
    return this.caregiverRepository.find()
  }

  findOne(id: string) {
    //@ts-ignore
    return this.caregiverRepository.findOneBy({ _id: new ObjectId(id) })
  }

  update(id: number, updateCaregiverInput: UpdateCaregiverInput) {
    return `This action updates a #${id} caregiver`
  }

  remove(id: number) {
    return `This action removes a #${id} caregiver`
  }

  // logic for seeding
  saveAll(caregivers: Caregiver[]): Promise<Caregiver[]> {
    return this.caregiverRepository.save(caregivers)
  }

  truncate(): Promise<void> {
    return this.caregiverRepository.clear()
  }
}
