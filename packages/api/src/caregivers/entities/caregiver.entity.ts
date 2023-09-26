import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Column, CreateDateColumn, Entity, ObjectIdColumn } from 'typeorm'
@Entity() // Database link - Typeorm
@ObjectType()
export class Caregiver {
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
  description: string

  @Column() // Database link - Typeorm
  @Field() //graphql
  available: boolean

  @CreateDateColumn({ type: 'timestamp', nullable: true }) // Database link - Typeorm
  @Field() //graphql
  createdAt: Date

  @CreateDateColumn({ type: 'timestamp', nullable: true }) // Database link - Typeorm
  @Field() //graphql
  updatedAt: Date
}
