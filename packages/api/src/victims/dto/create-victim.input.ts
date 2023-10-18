import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateVictimInput {
  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field()
  email: string

  @Field()
  phoneNumber: string
}
