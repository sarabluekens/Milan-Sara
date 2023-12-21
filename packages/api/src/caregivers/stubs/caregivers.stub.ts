import { CreateCaregiverInput } from '../dto/create-caregiver.input'
import { UpdateCaregiverInput } from '../dto/update-caregiver.input'
import { Caregiver } from '../entities/caregiver.entity'

export const createCaregiverInputStub = (): CreateCaregiverInput => {
  const newCaregiver = new CreateCaregiverInput()
  newCaregiver.firstName = 'john'
  newCaregiver.lastName = 'doe'
  newCaregiver.profession = 'Doctor'
  newCaregiver.availableForEvent = true
  newCaregiver.availableForNewCase = true
  newCaregiver.jobs = []

  return newCaregiver
}

export const caregiverStub = (): Caregiver => {
  const newCaregiver = new Caregiver()
  newCaregiver.id = '123123123123'
  newCaregiver.firstName = 'john'
  newCaregiver.lastName = 'doe'
  newCaregiver.profession = 'Doctor'
  newCaregiver.availableForEvent = true
  newCaregiver.availableForNewCase = true
  newCaregiver.jobs = []

  return newCaregiver
}

export const updateCaregiverInputStub = (): UpdateCaregiverInput => {
  const newCaregiver = new UpdateCaregiverInput()
  newCaregiver.firstName = 'john'
  newCaregiver.lastName = 'doe'
  newCaregiver.profession = 'Doctor'
  newCaregiver.availableForEvent = true
  newCaregiver.availableForNewCase = true
  newCaregiver.jobs = []
  newCaregiver.caregiverId = '123123123123'

  return newCaregiver
}
