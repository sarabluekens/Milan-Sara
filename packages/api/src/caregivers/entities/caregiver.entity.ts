import { ObjectType, Field, ID } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Jobs, JobsClass } from './jobs.entity'
@Entity() // Database link - Typeorm
@ObjectType()
export class Caregiver {
  @ObjectIdColumn()
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

  @Column() // Database link - Typeorm
  @Field(() => [JobsClass], { defaultValue: [] })
  jobs: Array<Jobs>

  @Column() // Database link - Typeorm
  @Field(() => String)
  userUid: string
}
