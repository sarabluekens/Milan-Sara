import { ObjectType, Field, InputType } from '@nestjs/graphql'

@ObjectType()
@InputType('UsedMaterialInput')
export class UsedMaterialClass {
  @Field()
  name: string

  @Field()
  amount: number
}

export type UsedMaterial = {
  name: string
  amount: number
}
