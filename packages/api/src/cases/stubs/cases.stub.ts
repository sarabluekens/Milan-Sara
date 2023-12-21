import { CreateCaseInput } from '../dto/create-case.input'
import { Case } from '../entities/case.entity'

jest.useFakeTimers().setSystemTime(new Date('2021-05-05T00:00:00.000Z'))

export const createCaseInputStub = (): CreateCaseInput => {
  const newCase = new CreateCaseInput()
  newCase.eventId = 'eventid'
  newCase.caregiverId = 'caregiverid1'
  newCase.typeAccident = 'fell'
  newCase.date = new Date('2021-05-05T00:00:00.000Z')
  newCase.checkUpRequired = false
  newCase.referred = false
  newCase.usedMaterials = [{ name: 'materialid', amount: 1, count: 1 }]
  newCase.status = 'pending'
  newCase.victimId = 'id'
  newCase.referralDescription = 'description'
  newCase.diagnose = 'diagnose'
  newCase.accidentDescription = 'description'
  newCase.careGiven = 'caregiven'
  newCase.checkUpDescription = 'checkupdescription'

  return newCase
}

export const caseStub = (): Case => {
  const newCase = new Case()
  newCase.id = 'caseid'
  newCase.eventId = 'eventid'
  newCase.caregiverId = 'caregiverid1'
  newCase.typeAccident = 'fell'
  newCase.date = new Date('2021-05-05T00:00:00.000Z')
  newCase.checkUpRequired = false
  newCase.referred = false
  newCase.usedMaterials = [{ name: 'materialid', amount: 1, count: 1 }]
  newCase.status = 'pending'
  newCase.victimId = 'id'
  newCase.referralDescription = 'description'
  newCase.diagnose = 'diagnose'
  newCase.accidentDescription = 'description'
  newCase.careGiven = 'caregiven'
  newCase.checkUpDescription = 'checkupdescription'

  return newCase
}
