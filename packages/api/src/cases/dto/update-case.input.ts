import { IsOptional } from 'class-validator'
import { CreateCaseInput } from './create-case.input'
import { InputType, Field, PartialType } from '@nestjs/graphql'
import { Coords, CoordsClass } from '../entities/coords.entity'

@InputType()
export class UpdateCaseInput extends PartialType(CreateCaseInput) {
  @Field(() => String)
  caseId: string

  // @IsOptional()
  // @Field(() => String, { nullable: true })
  // victimId: string

  @IsOptional()
  @Field(() => CoordsClass, { nullable: true })
  victimCoordinates: Coords

  @IsOptional()
  @Field(() => CoordsClass, { nullable: true })
  caregiverCoordinates: Coords
}
