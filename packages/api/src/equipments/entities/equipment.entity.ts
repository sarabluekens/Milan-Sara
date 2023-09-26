import { ObjectType, Field, ID } from '@nestjs/graphql'

@ObjectType()
export class Equipment {
  @Field(() => ID)
  id: string

  @Field()
  name: string
}
