import { InputType, Int, Field } from '@nestjs/graphql'
import { IsNotEmpty } from 'class-validator'

@InputType()
export class CreateEquipmentInput {
  @IsNotEmpty()
  @Field() //graphql
  name: string

  @IsNotEmpty()
  @Field() //graphql
  category: string

  @Field() //graphql
  description?: string

  @Field({ defaultValue: 0 }) //graphql
  totalStock: number

  @Field(() => [String], { nullable: true }) //graphql
  reservedStock: string[]

  @Field({ defaultValue: true }) //graphql
  available: boolean

  @IsNotEmpty()
  @Field() //graphql
  expirationDate: Date
}
