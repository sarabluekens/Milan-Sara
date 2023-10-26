import { ObjectType, Field, Int, ID } from '@nestjs/graphql'
import { UsedMaterial } from 'src/used-materials/entities/used-material.entity'
import { Column, ObjectIdColumn } from 'typeorm'

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
  @Field(() => [String], { defaultValue: [] })
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

  // @Column(() => UsedMaterial)
  // @Field(() => [UsedMaterial], { nullable: true })
  // usedMaterials: Array<UsedMaterial>

  //column = db
  //field = graphql
  //field en daarin store je object van linked entity
  //resolver = resolve om id om te zetten naar object
}