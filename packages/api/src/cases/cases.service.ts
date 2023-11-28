import { Injectable } from '@nestjs/common'
import { CreateCaseInput } from './dto/create-case.input'
import { UpdateCaseInput } from './dto/update-case.input'
import { Case } from './entities/case.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ObjectId } from 'mongodb'
@Injectable()
export class CasesService {
  constructor(
    @InjectRepository(Case)
    private readonly caseRepository: Repository<Case>,
  ) {}

  create(createCaseInput: CreateCaseInput): Promise<Case> {
    try {
      // shorthand for -> newCase = new Case(); newCase.victimId = createCaseInput.victimId; ...
      // const newCase = this.caseRepository.create(createCaseInput)
      const newCase = new Case()
      newCase.victimId = createCaseInput.victimId
      newCase.eventId = createCaseInput.eventId
      newCase.caregiverId = createCaseInput.caregiverId
      newCase.typeAccident = createCaseInput.typeAccident
      newCase.date = new Date()
      newCase.accidentDescription = createCaseInput.accidentDescription
      newCase.diagnose = createCaseInput.diagnose
      newCase.careGiven = createCaseInput.careGiven
      newCase.checkUpRequired = createCaseInput.checkUpRequired
      newCase.checkUpDescription = createCaseInput.checkUpDescription
      newCase.referred = createCaseInput.referred
      newCase.referralDescription = createCaseInput.referralDescription
      newCase.usedMaterials = createCaseInput.usedMaterials


      return this.caseRepository.save(newCase) // INSERT INTO case
    } catch (error) {
      throw error
    }
  }

  //  graphql
  async findAll(): Promise<Case[]> {
    return this.caseRepository.find() // SELECT *  case
  }

  findOneByDate(date: Date) {
    return this.caseRepository.find({ where: { date } })
  }

  update(id: number, updateCaseInput: UpdateCaseInput) {
    return `This action updates a #${id} case`
  }

  remove(id: number) {
    return `This action removes a #${id} case`
  }
}
