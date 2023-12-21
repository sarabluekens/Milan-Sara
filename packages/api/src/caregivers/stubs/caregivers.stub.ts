import { CreateCaregiverInput } from '../dto/create-caregiver.input'
import { Caregiver } from '../entities/caregiver.entity'

export const createCaregiverInputStub = (): CreateCaregiverInput => {
  const newCaregiver = new CreateCaregiverInput()
  newCaregiver.firstName = 'John'
  newCaregiver.lastName = 'Doe'
  newCaregiver.profession = 'Doctor'
  newCaregiver.availableForEvent = true
  newCaregiver.availableForNewCase = true
  newCaregiver.jobs = []
  newCaregiver.userUid = 'useruid'

  return newCaregiver
}

export const caregiverStub = (): Caregiver => {
  const newCaregiver = new Caregiver()
  newCaregiver.id = 'caregiverid'
  newCaregiver.firstName = 'John'
  newCaregiver.lastName = 'Doe'
  newCaregiver.profession = 'Doctor'
  newCaregiver.availableForEvent = true
  newCaregiver.availableForNewCase = true
  newCaregiver.jobs = []
  newCaregiver.userUid = 'useruid'

  return newCaregiver
}
