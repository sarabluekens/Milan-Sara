import { IsOptional } from 'class-validator'
import { Jobs, JobsClass } from '../entities/jobs.entity'
import { CreateCaregiverInput } from './create-caregiver.input'
import { InputType, Field, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateCaregiverInput extends PartialType(CreateCaregiverInput) {
  @Field(() => String, { nullable: true })
  caregiverId: string

  @IsOptional()
  @Field(() => [JobsClass], { defaultValue: [] })
  jobs: Array<Jobs>
}
