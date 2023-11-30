import { Injectable } from '@nestjs/common'
import { CreateVictimInput } from './dto/create-victim.input'
import { UpdateVictimInput } from './dto/update-victim.input'
import { Victim } from './entities/victim.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { ObjectId, Repository } from 'typeorm'

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

  remove(id: number) {
    return `This action updates a #${id} victim`
  }

  // update(caseId: string, victimId: string) {
  //   return this.victimRepository.update(caseId, victimId)
  // }

  // logic for seeding
  saveAll(victim: Victim[]): Promise<Victim[]> {
    return this.victimRepository.save(victim)
  }

  truncate(): Promise<void> {
    return this.victimRepository.clear()
  }
}
