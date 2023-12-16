import { IsOptional } from 'class-validator'
import { CreateCaseInput } from './create-case.input'
import { InputType, Field, PartialType } from '@nestjs/graphql'
import {
  VictimCoords,
  VictimCoordsClass,
} from '../entities/victim-coords.entity'

@InputType()
export class UpdateCaseInput extends PartialType(CreateCaseInput) {
  @Field(() => String)
  caseId: string

  @IsOptional()
  @Field(() => String, { nullable: true })
  victimId: string

  @IsOptional()
  @Field(() => VictimCoordsClass, { nullable: true })
  victimCoordinates: VictimCoords

  @IsOptional()
  @Field(() => VictimCoordsClass, { nullable: true })
  caregiverCoordinates: VictimCoords
}
