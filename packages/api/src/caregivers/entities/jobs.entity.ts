import { ObjectType, Field, InputType } from '@nestjs/graphql'
import { IsOptional } from 'class-validator'
import { string } from 'yargs'

@ObjectType()
@InputType('jobsInput')
export class JobsClass {
  @Field(() => String)
  eventId: string

  @IsOptional()
  @Field(() => [String], { nullable: true })
  workdays: string[]
}

export type Jobs = {
  eventId: string
  workdays: [string]
}
