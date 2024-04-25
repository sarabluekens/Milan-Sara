import { CreateVictimInput } from './create-victim.input'
import { InputType, Field, PartialType } from '@nestjs/graphql'
import { IsOptional } from 'class-validator'

@InputType()
export class UpdateVictimInput extends PartialType(CreateVictimInput) {
  @Field(() => String, { nullable: true })
  victimId: string

  @IsOptional()
  @Field(() => String, { nullable: true })
  caseId: string
}
