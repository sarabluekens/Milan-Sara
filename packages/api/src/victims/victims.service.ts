import { Injectable } from '@nestjs/common'
import { CreateVictimInput } from './dto/create-victim.input'
import { UpdateVictimInput } from './dto/update-victim.input'
import { Victim } from './entities/victim.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { ObjectId, Repository } from 'typeorm'

@Injectable()
export class VictimsService {
  @InjectRepository(Victim)
  private readonly victimRepository: Repository<Victim>
  create(createVictimInput: CreateVictimInput): Promise<Victim> {
    const v = new Victim()
    v.firstName = createVictimInput.firstName
    v.lastName = createVictimInput.lastName
    v.email = createVictimInput.email
    v.phoneNumber = createVictimInput.phoneNumber

    return this.victimRepository.save(v)
  }

  findAll() {
    return this.victimRepository.find()
  }

  findOne(id: string) {
    //@ts-ignore
    return this.victimRepository.findOneBy({ _id: new ObjectId(id) })
  }

  update(id: number, updateVictimInput: UpdateVictimInput) {
    return `This action updates a #${id} victim`
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
