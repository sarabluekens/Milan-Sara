import { ObjectType, Field, InputType } from '@nestjs/graphql'

@ObjectType()
@InputType('UsedMaterialInput')
export class UsedMaterialClass {
  @Field()
  name: string

  @Field()
  amount: number

  @Field({ nullable: true })
  count: number
}

export type UsedMaterial = {
  name: string
  amount: number
  count: number
}
