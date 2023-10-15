import { ObjectType, Field, ID } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm'

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
  category: string

  @Column({ nullable: true }) // Database link - Typeorm
  @Field({ nullable: true }) //graphql
  description: string

  @Column() // Database link - Typeorm
  @Field() //graphql
  totalStock: number

  @Column({ nullable: true }) // Database link - Typeorm
  @Field(() => [String], { nullable: true }) //graphql
  reservedStock: string[]

  @Column() // Database link - Typeorm
  @Field() //graphql
  available: boolean

  @Column() // Database link - Typeorm
  @Field() //graphql
  expirationDate: Date

  @CreateDateColumn({ type: 'timestamp', nullable: true }) // Database link - Typeorm
  @Field() //graphql
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp', nullable: true }) // Database link - Typeorm
  @Field() //graphql
  updatedAt: Date
}
