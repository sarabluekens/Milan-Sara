import { ObjectType, Field, Int } from '@nestjs/graphql'
import { type } from 'os'

@ObjectType()
export class UsedMaterialClass {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number

  @Field()
  name: string

  @Field()
  quantity: number
  
}

export type UsedMaterial = {
  id: string
  name: string
  quantity: number
}
