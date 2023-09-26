import { InputType, Int, Field } from '@nestjs/graphql'

@InputType()
export class CreateEquipmentInput {
  @Field() //graphql
  name: string

  @Field() //graphql
  fullname: string

  @Field() //graphql
  category: string

  @Field({ defaultValue: 0 }) //graphql
  amount: number

  @Field() //graphql
  available: boolean
}
