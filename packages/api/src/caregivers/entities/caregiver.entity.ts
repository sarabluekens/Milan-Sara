import { ObjectType, Field, ID } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm'
@Entity() // Database link - Typeorm
@ObjectType()
export class Caregiver {
  @ObjectIdColumn() // Database link - Typeorm
  @Field(() => ID)
  id: string

  @Column() // Database link - Typeorm
  @Field() //graphql
  lastName: string

  @Column() // Database link - Typeorm
  @Field() //graphql
  firstName: string

  @Column() // Database link - Typeorm
  @Field() //graphql
  profession: string // dokter, verpleger, ...

  @Column() // Database link - Typeorm
  @Field() //graphql
  availableForEvent: boolean

  @Column({ nullable: true }) // Database link - Typeorm
  @Field({ nullable: true }) //graphql
  availableForNewCase: boolean

  @CreateDateColumn({ type: 'timestamp', nullable: true }) // Database link - Typeorm
  @Field() //graphql
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp', nullable: true }) // Database link - Typeorm
  @Field() //graphql
  updatedAt: Date
}
