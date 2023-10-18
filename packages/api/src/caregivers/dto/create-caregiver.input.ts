import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateCaregiverInput {
  @Field() //graphql
  firstName: string

  @Field() //graphql
  lastName: string

  @Field() //graphql
  profession: string

  @Field({ defaultValue: true }) //graphql
  availableForEvent: boolean

  @Field({ defaultValue: true }) //graphql
  availableForNewCase: boolean
}
