import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Column, CreateDateColumn, Entity, ObjectIdColumn } from 'typeorm'
import { PhoneNumberMock } from 'graphql-scalars'
 
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
  phoneNumber: PhoneNumber

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  @Field()
  createdAt: Date
}
