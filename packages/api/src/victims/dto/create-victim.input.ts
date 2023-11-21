import { InputType, Field } from '@nestjs/graphql'
import { IsEmail, IsMobilePhone, IsNumber, IsOptional } from 'class-validator'
import { string } from 'yargs'

@InputType()
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
  @Field()
  phoneNumber: Float32Array

  @IsOptional()
  @Field(() => [String], { defaultValue: [] })
  cases: Array<string>
}
