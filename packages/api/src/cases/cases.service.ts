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
      const newCase = this.caseRepository.create(createCaseInput)
      newCase.date = new Date()
      return this.caseRepository.save(newCase) // INSERT INTO case
    } catch (error) {
      throw error
    }
  }

  //  graphql demo
  async findAll(): Promise<Case[]> {
    return this.caseRepository.find() // SELECT *  case
  }

  findOne(id: string) {
    //@ts-ignore
    return this.caseRepository.findOne({ _id: new ObjectId(id) })
  }

  update(id: number, updateCaseInput: UpdateCaseInput) {
    return `This action updates a #${id} case`
  }

  remove(id: number) {
    return `This action removes a #${id} case`
  }
}
