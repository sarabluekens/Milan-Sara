import { InputType, Field } from '@nestjs/graphql'
import { IsBoolean, IsOptional, IsIn, IsDate } from 'class-validator'

export const accidentTypes = [
  'fell',
  'unconscious',
  'bleed',
  'drug',
  'allergy',
  'other',
]
@InputType() // for graphql (create query in the service)
export class CreateCaseInput {
  @Field()
  victimId: string

  @Field()
  eventId: string

  @Field(() => [String], { defaultValue: [] })
  caregiverId: Array<string>

  @IsIn(accidentTypes)
  @Field()
  typeAccident: string

  @Field(() => Date)
  date: Date

  @Field()
  priority: number

  @Field()
  accidentDescription: string

  @Field()
  diagnose: string

  @Field()
  careGiven: string

  @IsBoolean()
  @Field()
  checkUpRequired: boolean

  @IsOptional()
  @Field({ nullable: true })
  checkUpDescription: string

  @IsBoolean()
  @Field()
  referred: boolean

  @IsOptional()
  @Field({ nullable: true })
  referralDescription: string

  @IsBoolean()
  @Field()
  personalEnsurance: boolean

  @IsBoolean()
  @Field()
  eventEnsurance: boolean

  // @Field(() => UsedMaterial)
  // usedMaterial: UsedMaterial
}
