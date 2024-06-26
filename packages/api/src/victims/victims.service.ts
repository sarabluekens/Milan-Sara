import { Injectable } from '@nestjs/common'
import { CreateVictimInput } from './dto/create-victim.input'
import { UpdateVictimInput } from './dto/update-victim.input'
import { Victim } from './entities/victim.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ObjectId } from 'mongodb'

@Injectable()
export class VictimsService {
  constructor(
    @InjectRepository(Victim)
    private readonly victimRepository: Repository<Victim>,
  ) {}

  create(createVictimInput: CreateVictimInput): Promise<Victim> {
    try {
      const victim = new Victim()
      victim.firstName = createVictimInput.firstName.toLowerCase()
      victim.lastName = createVictimInput.lastName.toLowerCase()
      victim.email = createVictimInput.email
      victim.phoneNumber = createVictimInput.phoneNumber
      victim.cases = victim.cases
        ? [...victim.cases, createVictimInput.caseId]
        : [createVictimInput.caseId]
      console.log('victims cases field:', victim.cases)
      return this.victimRepository.save(victim)
    } catch (error) {
      throw error
    }
  }

  async findAll(): Promise<Victim[]> {
    return this.victimRepository.find() // SELECT *  victim
  }

  findOneByFullName(firstName: string, lastName: string): Promise<Victim> {
    return this.victimRepository.findOne({ where: { firstName, lastName } })
  }

  findOne(id: string) {
    //@ts-ignore
    return this.victimRepository.findOneBy({ _id: new ObjectId(id) })
  }

  // add caseId to the array in Victim
  async updateCaseId(_id: string, caseId: string) {
    const currentVictim = await this.findOne(_id)

    if (currentVictim) {
      // currentVictim.cases.push(caseId)
      currentVictim.cases = [...currentVictim.cases, caseId]
      currentVictim.id = _id
      this.victimRepository.update(_id, currentVictim)
    } else {
      throw new Error('Victim not found')
    }
    return currentVictim
  }

  remove(id: number) {
    return `This action removes a #${id} victim`
  }

  // logic for seeding
  saveAll(victim: Victim[]): Promise<Victim[]> {
    return this.victimRepository.save(victim)
  }

  truncate(): Promise<void> {
    return this.victimRepository.clear()
  }
}
