import { ObjectType, Field, Int, InputType, ID } from '@nestjs/graphql'
import { type } from 'os'
import { ObjectIdColumn } from 'typeorm'

@ObjectType()
@InputType('UsedMaterialInput')
export class UsedMaterialClass {
  @Field()
  name: string

  @Field()
  amount: number
}

export type UsedMaterial = {
  id: string
  name: string
  quantity: number
}
