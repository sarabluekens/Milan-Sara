import { InputType, Int, Field } from '@nestjs/graphql'
import { UsedMaterial } from 'src/used-materials/entities/used-material.entity'
@InputType()
export class CreateCaseInput {
  @Field()
  victimId: string

  @Field()
  eventId: string

  @Field(() => [String], { defaultValue: [] })
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

  // @Field(() => UsedMaterial)
  // usedMaterial: UsedMaterial
}
