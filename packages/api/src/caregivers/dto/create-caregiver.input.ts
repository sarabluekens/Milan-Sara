import { InputType, Int, Field } from '@nestjs/graphql'

@InputType()
export class CreateCaregiverInput {
  @Field() //graphql
  name: string

  @Field() //graphql
  fullname: string

  @Field() //graphql
  category: string

  @Field() //graphql
  description: string

  @Field({ defaultValue: true }) //graphql
  available: boolean
}
