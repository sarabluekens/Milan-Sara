import { Injectable } from '@nestjs/common'
import { CreateCaseInput } from './dto/create-case.input'
import { UpdateCaseInput } from './dto/update-case.input'
import { Case } from './entities/case.entity'
import { UUID } from 'typeorm/driver/mongodb/bson.typings'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class CasesService {
  constructor(
    @InjectRepository(Case)
    private readonly caseRepository: Repository<Case>,
  ) {}

  create(createCaseInput: CreateCaseInput): Promise<Case> {
    try {
      const casee = new Case()
      casee.id = new UUID().toString()
      // casee.victimId = createCaseInput.victimId
      // casee.eventId = createCaseInput.eventId
      // casee.caregiverId = createCaseInput.caregiverId
      casee.typeAccident = createCaseInput.typeAccident
      casee.date = createCaseInput.date
      // casee.priority = createCaseInput.priority
      // casee.accidentDescription = createCaseInput.accidentDescription
      // casee.diagnose = createCaseInput.diagnose
      // casee.careGiven = createCaseInput.careGiven
      // casee.checkUpRequired = createCaseInput.checkUpRequired
      // casee.checkUpDescription = createCaseInput.checkUpDescription
      // casee.referred = createCaseInput.Referred
      // casee.referralDescription = createCaseInput.referralDescription
      // casee.personalEnsurance = createCaseInput.personalEnsurance
      // casee.eventEnsurance = createCaseInput.eventEnsurance

      return this.caseRepository.save(casee)
    } catch (error) {
      throw error
    }
  }

  findAll() {
    return `This action returns all cases`
  }

  findOne(id: number) {
    return `This action returns a #${id} case`
  }

  update(id: number, updateCaseInput: UpdateCaseInput) {
    return `This action updates a #${id} case`
  }

  remove(id: number) {
    return `This action removes a #${id} case`
  }
}
