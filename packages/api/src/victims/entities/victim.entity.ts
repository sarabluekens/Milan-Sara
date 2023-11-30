import { ObjectType, Field, ID } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  OneToMany,
} from 'typeorm'
import { GraphQLPhoneNumber } from 'graphql-scalars'
import { string } from 'yargs'
import { Case } from 'src/cases/entities/case.entity'
// Now, use GraphQLScalarName as a type within your GraphQL Schema.

@Entity()
@ObjectType()
export class Victim {
  @ObjectIdColumn()
  @Field(() => ID)
  id: string

  @Column()
  @Field()
  firstName: string

  @Column()
  @Field()
  lastName: string

  @Column()
  @Field()
  email: string

  @Column()
  @Field()
  phoneNumber: string

  @OneToMany(() => Case, newcase => newcase.victimId)
  @Field(() => [String], { defaultValue: [] })
  cases: String[]
}
