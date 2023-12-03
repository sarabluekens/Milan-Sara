import { ObjectType, Field, InputType } from '@nestjs/graphql'
import { Column } from 'typeorm'

@ObjectType() //graphql
@InputType('ReservedStockInput')
export class ReservedStock {
  @Column({ nullable: true }) // Database link - Typeorm
  @Field({ nullable: true })
  eventId: string

  @Column({ nullable: true }) // Database link - Typeorm
  @Field({ nullable: true }) //graphql
  amount: number
}

export type ReservedStockType = {
  eventId: string
  amount: number
}
