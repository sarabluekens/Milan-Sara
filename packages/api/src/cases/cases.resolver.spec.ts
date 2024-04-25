import { Test, TestingModule } from '@nestjs/testing'
import { CasesResolver } from './cases.resolver'
import { CasesService } from './cases.service'
import { caseStub } from './stubs/cases.stub'
import { CreateCaseInput } from './dto/create-case.input'
import { Case } from './entities/case.entity'

jest.mock('./cases.service')
describe('CasesResolver', () => {
  let resolver: CasesResolver
  let mockedCases: CasesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CasesResolver, CasesService],
    }).compile()

    resolver = module.get<CasesResolver>(CasesResolver)
    mockedCases = module.get<CasesService>(CasesService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  describe('createCase', () => {
    let casesDTO: CreateCaseInput
    let resultCase: Case
    beforeEach(async () => {
      casesDTO = {
        victimId: caseStub().victimId,
        eventId: caseStub().eventId,
        caregiverId: caseStub().caregiverId,
        typeAccident: caseStub().typeAccident,
        date: caseStub().date,
        accidentDescription: caseStub().accidentDescription,
        diagnose: caseStub().diagnose,
        careGiven: caseStub().careGiven,
        checkUpRequired: caseStub().checkUpRequired,
        checkUpDescription: caseStub().checkUpDescription,
        referred: caseStub().referred,
        referralDescription: caseStub().referralDescription,
        personalEnsurance: caseStub().personalEnsurance,
        eventEnsurance: caseStub().eventEnsurance,
        usedMaterials: caseStub().usedMaterials,
        status: caseStub().status,
      }
      console.log(casesDTO)
      resultCase = await resolver.createCase(casesDTO)
    })

    it('should call service.createCase one time', async () => {
      expect(mockedCases.create).toHaveBeenCalledTimes(1)
    })

    it('should call service.createCase with the correct arguments', async () => {
      expect(mockedCases.create).toHaveBeenCalledWith(casesDTO)
    })

    it('should return the correct result', async () => {
      expect(resultCase).toEqual(caseStub())
    })
  })

  describe('getCasesforCaregiverToday', () => {
    let userUid: string = '123123123123'
    let resultCase: Case[]

    beforeEach(async () => {
      resultCase = await resolver.findCasesForCaregiverToday(userUid)
    })

    it('should call service.findCasesForCaregiverToday one time', async () => {
      expect(mockedCases.findCasesForCaregiverToday).toHaveBeenCalledTimes(1)
    })

    it('should call service.findCasesForCaregiverToday with the correct arguments', async () => {
      expect(mockedCases.findCasesForCaregiverToday).toHaveBeenCalledWith(
        userUid,
      )
    })

    it('should return the correct result', async () => {
      expect(resultCase).toEqual([caseStub()])
    })
  })
})
