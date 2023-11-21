import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsMobilePhone, IsOptional } from 'class-validator'
import { GraphQLPhoneNumber } from 'graphql-scalars'
@InputType() // for graphql (create query in the service)
export class CreateVictimInput {
  @Field()
  firstName: string

  @Field()
  lastName: string

  @IsOptional()
  @IsEmail()
  @Field()
  email: string

  @IsOptional()
  @IsMobilePhone()
  @Field(type => GraphQLPhoneNumber)
  phoneNumber: string

  @IsOptional()
  @Field(() => [String], { defaultValue: [] })
  cases: Array<string>
}
