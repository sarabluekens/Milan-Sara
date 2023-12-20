import { Injectable } from '@nestjs/common'
import { CreateCaseInput } from './dto/create-case.input'
import { Case } from './entities/case.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ObjectId } from 'mongodb'
import { CaregiversService } from 'src/caregivers/caregivers.service'

@Injectable()
export class CasesService {
  constructor(
    @InjectRepository(Case)
    private readonly caseRepository: Repository<Case>,
    private readonly caregiversService: CaregiversService,
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
      newCase.status = 'pending'

      return this.caseRepository.save(newCase) // INSERT INTO case
    } catch (error) {
      throw error
    }
  }

  getCaseById(caseId: string): Promise<Case> {
    //@ts-ignore
    return this.caseRepository.findOne({ _id: new ObjectId(caseId) })
  }

  //  graphql
  async findAll(): Promise<Case[]> {
    return this.caseRepository.find() // SELECT *  case
  }

  findOneByDate(date: Date) {
    return this.caseRepository.find({ where: { date } })
  }

  findAllByEventId(eventId: string) {
    return this.caseRepository.find({ where: { eventId, status: 'pending' } })
  }

  async findCasesForCaregiverToday(userUid: string) {
    const caregiver = await this.caregiversService.findByUserUid(userUid)

    let eventId = ''
    const dateObj = new Date()
    const month = dateObj.getMonth() + 1
    const currentDate: string =
      dateObj.getFullYear() +
      '-' +
      month +
      '-' +
      dateObj.getDate() +
      'T00:00:00.000Z'

    for (let i = 0; i < caregiver.jobs.length; i++) {
      if (caregiver.jobs[i].workdays.includes(currentDate)) {
        eventId = caregiver.jobs[i].eventId
      }
    }

    if (eventId === '') return []
    else {
      return this.findAllByEventId(eventId)
    }
  }

  // add victimId to the Case
  async updateVictimId(id: string, victimId: string): Promise<Case> {
    const currentCase = await this.caseRepository.findOne({
      //@ts-ignore
      _id: new ObjectId(id),
    })

    if (currentCase) {
      currentCase.victimId = victimId
      this.caseRepository.update(id, currentCase)
    } else {
      throw new Error('Case not found')
    }
    return currentCase
  }

  // add victim coordinates to the Case
  async updateVictimCo(
    id: string,
    victimCoordinates: { lat: number; lng: number },
  ) {
    const currentCase = await this.caseRepository.findOne({
      //@ts-ignore
      _id: new ObjectId(id),
    })

    if (currentCase) {
      currentCase.victimCoordinates = victimCoordinates
      this.caseRepository.update(id, currentCase)
      console.log('currentCase update', currentCase)
    } else {
      throw new Error('Case not found')
    }
    return currentCase
  }

  // add victim coordinates to the Case
  async updateCaregiverCo(
    id: string,
    caregiverCoordinates: { lat: number; lng: number },
  ) {
    const currentCase = await this.caseRepository.findOne({
      //@ts-ignore
      _id: new ObjectId(id),
    })

    if (currentCase) {
      currentCase.caregiverCoordinates = caregiverCoordinates
      this.caseRepository.update(id, currentCase)
      console.log('currentCase', currentCase)
    } else {
      throw new Error('Case not found')
    }
    return currentCase
  }

  async assignCaregiverToCase(caseId: string, caregiverId: string) {
    const currentCase = await this.caseRepository.findOne({
      //@ts-ignore
      _id: new ObjectId(caseId),
    })

    if (currentCase) {
      currentCase.caregiverId = caregiverId
      currentCase.status = 'ongoing'
      this.caseRepository.update(caseId, currentCase)

      console.log('currentCase', currentCase)
    } else {
      throw new Error('Case not found')
    }
    return currentCase
  }

  remove(id: number) {
    return `This action removes a #${id} case`
  }
}
