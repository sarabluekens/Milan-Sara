import { InputType, Field } from '@nestjs/graphql'
import { Jobs, JobsClass } from '../entities/jobs.entity'
import { IsIn, IsOptional } from 'class-validator'

export const professionTypes = ['Doctor', 'Nurse', 'Paramedic']
@InputType()
export class CreateCaregiverInput {
  @Field() //graphql
  firstName: string

  @Field() //graphql
  lastName: string

  @IsIn(professionTypes)
  @Field() //graphql
  profession: string

  @IsOptional()
  @Field({ defaultValue: true }) //graphql
  availableForEvent: boolean

  @IsOptional()
  @Field({ defaultValue: true }) //graphql
  availableForNewCase: boolean

  @IsOptional()
  @Field(() => [JobsClass], { defaultValue: [] })
  jobs: Array<Jobs>
}
