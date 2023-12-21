import { Injectable } from '@nestjs/common'
import { CreateCaregiverInput } from './dto/create-caregiver.input'
import { UpdateCaregiverInput } from './dto/update-caregiver.input'
import { Caregiver } from './entities/caregiver.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ObjectId } from 'mongodb'

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
    if (createCaregiverInput.availableForEvent)
      c.availableForEvent = createCaregiverInput.availableForEvent
    if (createCaregiverInput.availableForNewCase)
      c.availableForNewCase = createCaregiverInput.availableForNewCase
    if (createCaregiverInput.jobs) c.jobs = createCaregiverInput.jobs
    return this.caregiverRepository.save(c)
  }

  findAll() {
    return this.caregiverRepository.find()
  }

  findOne(id: string) {
    //@ts-ignore
    return this.caregiverRepository.findOneBy({ _id: new ObjectId(id) })
  }

  findByUserUid(userUid: string) {
    return this.caregiverRepository.findOne({ where: { userUid } })
  }

  async updateJobs(
    caregiverId: string,
    updateCaregiverInput: UpdateCaregiverInput,
  ) {
    const currentCaregiver = await this.findOne(caregiverId)

    if (currentCaregiver) {
      console.log('currentCaregiver:', currentCaregiver)
      currentCaregiver.id = caregiverId
      currentCaregiver.jobs = [
        ...currentCaregiver.jobs,
        ...updateCaregiverInput.jobs,
      ]
      this.caregiverRepository.update(caregiverId, currentCaregiver)
    } else {
      throw new Error('Caregiver not found')
    }
    return currentCaregiver
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
