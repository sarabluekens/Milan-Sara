import { ObjectType, Field, Int, ID } from '@nestjs/graphql'
import { Column, ObjectIdColumn } from 'typeorm'
import { UsedMaterials } from '../../../../pwa/src/interfaces/used.materials.interface'

@ObjectType()
export class Case {
  @ObjectIdColumn()
  @Field(() => ID)
  id: string

  @Column()
  @Field()
  victimId: string

  @Column()
  @Field()
  eventId: string

  @Column()
  @Field()
  caregiverId: Array<string>

  @Column()
  @Field()
  typeAccident: string

  @Column()
  @Field()
  date: Date

  @Column()
  @Field()
  priority: number

  @Column()
  @Field()
  accidentDescription: string

  @Column()
  @Field()
  diagnose: string

  @Column()
  @Field()
  careGiven: string

  @Column()
  @Field()
  checkUpRequired: boolean

  @Column({ nullable: true })
  @Field({ nullable: true })
  checkUpDescription: string

  @Column()
  @Field()
  Referred: boolean

  @Column({ nullable: true })
  @Field({ nullable: true })
  referralDescription: string

  @Column()
  @Field()
  personalEnsurance: boolean

  @Column()
  @Field()
  eventEnsurance: boolean

  @Column({ nullable: true })
  @Field({ nullable: true })
  usedMaterials: Array<UsedMaterials>
}
