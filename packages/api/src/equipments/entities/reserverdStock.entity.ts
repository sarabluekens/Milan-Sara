import { ObjectType, Field } from '@nestjs/graphql'
import { Column, Entity } from 'typeorm'

@Entity() // Database link - Typeorm
@ObjectType() //graphql
export class ReservedStock {
  @Column() // Database link - Typeorm
  @Field()
  eventId: string

  @Column() // Database link - Typeorm
  @Field() //graphql
  amount: string
}
