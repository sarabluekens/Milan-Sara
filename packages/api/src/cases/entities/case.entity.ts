import { ObjectType, Field, Int, ID } from '@nestjs/graphql'
import { graphql } from 'graphql'
import { type } from 'os'
import {
  UsedMaterial,
  UsedMaterialClass,
} from 'src/cases/entities/used-material.entity'
import { Column, Entity, ObjectIdColumn } from 'typeorm'

@Entity()
@ObjectType()
export class Case {
  @ObjectIdColumn() // Database link - Typeorm
  @Field(() => ID)
  id: string

  @Column()
  @Field({ nullable: true })
  victimId: string

  @Column()
  @Field()
  eventId: string

  @Column()
  @Field(() => [String], { defaultValue: [], nullable: true })
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
  @Field({ nullable: true })
  accidentDescription: string

  @Column()
  @Field({ nullable: true })
  diagnose: string

  @Column()
  @Field({ nullable: true })
  careGiven: string

  @Column()
  @Field({ defaultValue: false })
  checkUpRequired: boolean

  @Column({ nullable: true })
  @Field({ nullable: true })
  checkUpDescription?: string

  @Column()
  @Field({ defaultValue: false })
  referred: boolean

  @Column({ nullable: true }) //db
  @Field({ nullable: true }) //graphql
  referralDescription?: string

  @Column()
  @Field({ defaultValue: true })
  personalEnsurance: boolean

  @Column()
  @Field({ defaultValue: false })
  eventEnsurance: boolean

  @Column()
  @Field(() => [UsedMaterialClass], { defaultValue: [], nullable: true })
  usedMaterials: Array<UsedMaterial>
  type: UsedMaterial

  @Column()
  @Field(() => [UsedMaterialClass], { defaultValue: [], nullable: true })
  usedMaterial: Array<UsedMaterial>

  // @Column(() => UsedMaterial)
  // @Field(() => [UsedMaterial], { nullable: true })
  // usedMaterials: Array<UsedMaterial>

  //column = db
  //field = graphql
  //field en daarin store je object van linked entity
  //resolver = resolve om id om te zetten naar object
}
