import { ObjectType, Field, ID } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm'
import { boolean } from 'yargs'
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
  category: string // dokter, verpleger, ...

  @Column() // Database link - Typeorm
  @Field() //graphql
  description: string

  @Column({ nullable: true }) // Database link - Typeorm
  @Field({ nullable: true }) //graphql
  available: boolean

  @CreateDateColumn({ type: 'timestamp', nullable: true }) // Database link - Typeorm
  @Field() //graphql
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp', nullable: true }) // Database link - Typeorm
  @Field() //graphql
  updatedAt: Date
}
