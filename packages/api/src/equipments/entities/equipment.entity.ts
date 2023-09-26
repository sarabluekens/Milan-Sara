import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Column, Entity, ObjectIdColumn } from 'typeorm'

@Entity() // Database link - Typeorm
@ObjectType() //graphql
export class Equipment {
  @ObjectIdColumn() // Database link - Typeorm
  @Field(() => ID)
  id: string

  @Column() // Database link - Typeorm
  @Field() //graphql
  name: string

  @Column() // Database link - Typeorm
  @Field() //graphql
  fullname: string

  @Column() // Database link - Typeorm
  @Field() //graphql
  category: string

  @Column() // Database link - Typeorm
  @Field() //graphql
  amount: number

  @Column() // Database link - Typeorm
  @Field() //graphql
  available: boolean

  @Column() // Database link - Typeorm
  @Field() //graphql
  createdAt: Date

  @Column() // Database link - Typeorm
  @Field() //graphql
  updatedAt: Date
}
