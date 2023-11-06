import { InputType, Field } from '@nestjs/graphql'
import { IsBoolean, IsOptional, IsIn, isArray, IsArray } from 'class-validator'
import { type } from 'os'
import {
  UsedMaterial,
  UsedMaterialClass,
} from 'src/cases/entities/used-material.entity'

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
  @IsOptional()
  @Field({ nullable: true })
  victimId: string

  @Field()
  eventId: string

  @IsOptional()
  @Field(() => [String], { defaultValue: [], nullable: true })
  caregiverId: Array<string>

  @IsOptional()
  @IsArray()
  @Field(() => [UsedMaterialClass], { defaultValue: [], nullable: true })
  usedMaterial: Array<UsedMaterial>

  @IsIn(accidentTypes)
  @Field()
  typeAccident: string

  @Field(() => Date)
  date: Date

  @Field()
  priority: number

  @IsOptional()
  @Field({ nullable: true })
  accidentDescription: string

  @IsOptional()
  @Field({ nullable: true })
  diagnose: string

  @IsOptional()
  @Field({ nullable: true })
  careGiven: string

  @IsBoolean()
  @Field({ nullable: true, defaultValue: false })
  checkUpRequired: boolean

  @IsOptional()
  @Field({ nullable: true })
  checkUpDescription: string

  @IsBoolean()
  @Field({ nullable: true, defaultValue: false })
  referred: boolean

  @IsOptional()
  @Field({ nullable: true })
  referralDescription: string

  @IsBoolean()
  @Field({ nullable: true, defaultValue: true })
  personalEnsurance: boolean

  @IsBoolean()
  @Field({ nullable: true, defaultValue: false })
  eventEnsurance: boolean

  // @Field(() => UsedMaterial)
  // usedMaterial: UsedMaterial
}
