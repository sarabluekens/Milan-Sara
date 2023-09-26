import { ObjectType, Field, Int, ID } from '@nestjs/graphql'

@ObjectType()
export class Caregiver {
  @Field(() => ID)
  id: string

  @Field()
  name: string

  @Field()
  fullname: string

  @Field()
  category: string

  @Field()
  description: string

  @Field()
  available: boolean

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
