import { ObjectType, Field, ID } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm'

import { ReservedStock, ReservedStockType } from './reserverdStock.entity'

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
  @Field(() => [ReservedStock], { defaultValue: [], nullable: true }) //graphql
  reservedStock: Array<ReservedStockType>

  @Column() // Database link - Typeorm
  @Field() //graphql
  available: boolean

  @Column({ nullable: true }) // Database link - Typeorm
  @Field({ nullable: true }) //graphql
  expirationDate?: Date

  @CreateDateColumn({ type: 'timestamp', nullable: true }) // Database link - Typeorm
  @Field() //graphql
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp', nullable: true }) // Database link - Typeorm
  @Field() //graphql
  updatedAt: Date
}
