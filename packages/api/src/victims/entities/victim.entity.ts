import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Column, CreateDateColumn, Entity, ObjectIdColumn } from 'typeorm'
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

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  @Field()
  createdAt: Date
}
