import { InputType, Int, Field } from '@nestjs/graphql'
import type { UsedMaterials } from '../../../../pwa/src/interfaces/used.materials.interface'
@InputType()
export class CreateCaseInput {
  @Field()
  victimId: string

  @Field()
  eventId: string

  @Field()
  caregiverId: Array<string>

  @Field()
  typeAccident: string

  @Field()
  date: Date

  @Field()
  priority: number

  @Field()
  accidentDescription: string

  @Field()
  diagnose: string

  @Field()
  careGiven: string

  @Field()
  checkUpRequired: boolean

  @Field()
  checkUpDescription: string

  @Field()
  Referred: boolean

  @Field()
  referralDescription: string

  @Field()
  personalEnsurance: boolean

  @Field()
  eventEnsurance: boolean

  @Field()
  usedMaterials: Array<UsedMaterials>
}
