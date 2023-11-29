import { InputType, Field } from '@nestjs/graphql'
import { IsBoolean, IsOptional, IsIn, IsDate } from 'class-validator'
import {
  UsedMaterial,
  UsedMaterialClass,
} from '../entities/used-material.entity'
export const accidentTypes = [
  'fell',
  'unconscious',
  'bleed',
  'drugs',
  'allergy',
  'other',
]
@InputType() // for graphql (create query in the service)
export class CreateCaseInput {
  @IsOptional()
  @Field({ nullable: true })
  victimId?: string

  @Field()
  eventId: string

  @IsOptional()
  @Field(() => [String], { defaultValue: [] })
  caregiverId: Array<string>

  @IsIn(accidentTypes)
  @Field()
  typeAccident: string

  @Field(() => Date)
  date: Date

  @IsOptional()
  @Field({ nullable: true })
  accidentDescription?: string

  @IsOptional()
  @Field({ nullable: true })
  diagnose?: string

  @IsOptional()
  @Field({ nullable: true })
  careGiven?: string

  @IsBoolean()
  @Field({ defaultValue: false })
  checkUpRequired: boolean

  @IsOptional()
  @Field({ nullable: true })
  checkUpDescription?: string

  @IsBoolean()
  @Field({ defaultValue: false })
  referred: boolean

  @IsOptional()
  @Field({ nullable: true })
  referralDescription?: string

  @IsBoolean()
  @Field({ defaultValue: true })
  personalEnsurance: boolean

  @IsBoolean()
  @Field({ defaultValue: false })
  eventEnsurance: boolean

  @IsOptional()
  @Field(() => [UsedMaterialClass], { defaultValue: [] })
  usedMaterials: Array<UsedMaterial>
}
