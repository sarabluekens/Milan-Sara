import { ObjectType, Field, ID } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm'

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  COMPANY = 'COMPANY',
  CAREGIVER = 'CAREGIVER',
}

@Entity()
@ObjectType()
export class User {
  @ObjectIdColumn()
  @Field(() => ID)
  id: string

  @Column()
  @Field()
  uid: string

  @Column()
  @Field()
  name: string

  @Column()
  @Field()
  email: string

  @Column()
  @Field()
  locale?: string

  @Column({ default: Role.USER })
  @Field(() => String) // return type
  role: Role

  @CreateDateColumn({ type: 'timestamp', nullable: true }) // Database link - Typeorm
  @Field() //graphql
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp', nullable: true }) // Database link - Typeorm
  @Field() //graphql
  updatedAt: Date
}
