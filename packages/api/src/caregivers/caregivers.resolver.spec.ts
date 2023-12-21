import { Test, TestingModule } from '@nestjs/testing'
import { CaregiversResolver } from './caregivers.resolver'
import { CaregiversService } from './caregivers.service'
import { CreateCaregiverInput } from './dto/create-caregiver.input'
import { caregiverStub } from './stubs/caregivers.stub'
import { Caregiver } from './entities/caregiver.entity'
import { UpdateCaregiverInput } from './dto/update-caregiver.input'

jest.mock('./caregivers.service')
describe('CaregiversResolver', () => {
  let resolver: CaregiversResolver
  let mockedCaregivers: CaregiversService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CaregiversResolver, CaregiversService],
    }).compile()

    resolver = module.get<CaregiversResolver>(CaregiversResolver)
    mockedCaregivers = module.get<CaregiversService>(CaregiversService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  describe('createCaregiver', () => {
    let caregivertDTO: CreateCaregiverInput
    let resultCaregiver: Caregiver

    beforeEach(async () => {
      caregivertDTO = {
        firstName: caregiverStub().firstName,
        lastName: caregiverStub().lastName,
        profession: caregiverStub().profession,
        availableForEvent: caregiverStub().availableForEvent,
        availableForNewCase: caregiverStub().availableForNewCase,
        jobs: caregiverStub().jobs,
        userUid: caregiverStub().userUid,
      }
      console.log(caregivertDTO)
      resultCaregiver = await resolver.createCaregiver(caregivertDTO)
    })

    it('should call service.createCaregiver one time', async () => {
      expect(mockedCaregivers.create).toHaveBeenCalledTimes(1)
    })

    it('should call service.createCaregiver with the correct arguments', async () => {
      expect(mockedCaregivers.create).toHaveBeenCalledWith(caregivertDTO)
    })

    it('should return the correct result', async () => {
      expect(resultCaregiver).toEqual(caregiverStub())
    })
  })

  describe('updateJobs', () => {
    let updateCaregiverDTO: UpdateCaregiverInput
    let caregiverId: string = '123123123123'
    let resultCaregiver: Caregiver

    beforeEach(async () => {
      updateCaregiverDTO = {
        firstName: caregiverStub().firstName,
        lastName: caregiverStub().lastName,
        profession: caregiverStub().profession,
        availableForEvent: caregiverStub().availableForEvent,
        availableForNewCase: caregiverStub().availableForNewCase,
        jobs: caregiverStub().jobs,
        caregiverId: caregiverStub().id,
      }
      resultCaregiver = await resolver.updateCaregiverJobs(updateCaregiverDTO)
    })

    it('should call service.updateJobs one time', async () => {
      expect(mockedCaregivers.updateJobs).toHaveBeenCalledTimes(1)
    })

    it('should call service.updateJobs with the correct arguments', async () => {
      expect(mockedCaregivers.updateJobs).toHaveBeenCalledWith(
        caregiverId,
        updateCaregiverDTO,
      )
    })

    it('should return the correct result', async () => {
      expect(resultCaregiver).toEqual(caregiverStub())
    })
  })
})
