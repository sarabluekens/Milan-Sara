import { CreateCaseInput } from '../dto/create-case.input'
import { Case } from '../entities/case.entity'

export const createCaseInputStub = (): CreateCaseInput => {
  const newCase = new CreateCaseInput()
  newCase.eventId = 'eventid'
  newCase.caregiverId = ['caregiverid1', 'caregiverid2']
  newCase.typeAccident = 'fell'
  newCase.date = new Date()
  newCase.checkUpRequired = false
  newCase.referred = false
  newCase.personalEnsurance = true
  newCase.eventEnsurance = false
  newCase.usedMaterials = [{ name: 'materialid', quantity: 1 }]

  return newCase
}

export const caseStub = (): Case => {
  const newCase = new Case()
  newCase.id = 'caseid'
  newCase.eventId = 'eventid'
  newCase.caregiverId = ['caregiverid1', 'caregiverid2']
  newCase.typeAccident = 'fell'
  newCase.date = new Date()
  newCase.checkUpRequired = false
  newCase.referred = false
  newCase.personalEnsurance = true
  newCase.eventEnsurance = false
  newCase.usedMaterials = [{ name: 'materialid', quantity: 1 }]

  return newCase
}
