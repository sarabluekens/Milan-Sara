import { CreateVictimInput } from '../dto/create-victim.input'
import { Victim } from '../entities/victim.entity'

export const createVictimInputStub = (): CreateVictimInput => {
  const newVictim = new CreateVictimInput()
  newVictim.firstName = 'John'
  newVictim.lastName = 'Doe'
  newVictim.email = 'John@Doe.be'
  newVictim.phoneNumber = '0123456789'

  return newVictim
}

export const victimStub = (): Victim => {
  const newVictim = new Victim()
  newVictim.id = '1'
  newVictim.firstName = 'John'
  newVictim.lastName = 'Doe'
  newVictim.email = 'John@Doe.be'
  newVictim.phoneNumber = '0123456789'
  newVictim.cases = []

  return newVictim
}
