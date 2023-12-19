import { ObjectType, Field, ID } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm'
import { MapCoords, MapCoordsType } from './mapCoords.entity'

export enum Status {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
  Completed = 'Completed',
}

@Entity()
@ObjectType()
export class Event {
  @ObjectIdColumn() // Database link - Typeorm
  @Field(() => ID)
  id: string

  @Column() // Database link - Typeorm
  @Field() //graphql
  name: string

  @Column() // Database link - Typeorm
  @Field() //graphql
  category: string

  @Column() // Database link - Typeorm
  @Field() //graphql
  address: string

  @Column() // Database link - Typeorm
  @Field() //graphql
  postalCode: string

  @Column() // Database link - Typeorm
  @Field() //graphql
  city: string

  @Column() // Database link - Typeorm
  @Field(() => [Date]) //graphql
  dates: Date[]

  @Column() // Database link - Typeorm
  @Field() //graphql
  startHour: string

  @Column() // Database link - Typeorm
  @Field() //graphql
  endHour: string

  @Column() // Database link - Typeorm
  @Field() //graphql
  contactPerson: string

  @Column() // Database link - Typeorm
  @Field() //graphql
  phoneNumber: string

  @Column() // Database link - Typeorm
  @Field() //graphql
  email: string

  @Column() // Database link - Typeorm
  @Field() //graphql
  btwNumber: string

  @Column() // Database link - Typeorm
  @Field() //graphql
  eventWithChildren: boolean

  @Column() // Database link - Typeorm
  @Field() //graphql
  mapsLink: string

  @Column({ nullable: true }) // Database link - Typeorm
  @Field(() => [MapCoords], { defaultValue: [], nullable: true }) //graphql
  mapCoords: Array<MapCoordsType>

  @Column() // Database link - Typeorm
  @Field() //graphql
  expectedVisitorStaffCount: number

  @Column({ default: Status.Pending }) // Database link - Typeorm
  @Field() //graphql
  status: Status

  @CreateDateColumn({ type: 'timestamp', nullable: true }) // Database link - Typeorm
  @Field() //graphql
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp', nullable: true }) // Database link - Typeorm
  @Field() //graphql
  updatedAt: Date
}
