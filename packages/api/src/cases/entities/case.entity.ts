import { ObjectType, Field, ID } from '@nestjs/graphql'
import { UsedMaterial, UsedMaterialClass } from './used-material.entity'
import { Column, Entity, ObjectIdColumn } from 'typeorm'
import { Coords, CoordsClass } from './coords.entity'

@Entity()
@ObjectType()
export class Case {
  @ObjectIdColumn() // Database link - Typeorm
  @Field(() => ID)
  id: string

  @Column()
  @Field({ nullable: true })
  victimId?: string

  @Column()
  @Field()
  eventId: string

  @Column()
  @Field(() => String, { defaultValue: '' })
  caregiverId: string

  @Column()
  @Field()
  typeAccident: string

  @Column()
  @Field()
  date: Date

  @Column()
  @Field({ nullable: true })
  accidentDescription?: string

  @Column()
  @Field({ nullable: true })
  diagnose?: string

  @Column()
  @Field({ nullable: true })
  careGiven?: string

  @Column()
  @Field({ defaultValue: false })
  checkUpRequired: boolean

  @Column()
  @Field({ nullable: true })
  checkUpDescription?: string

  @Column()
  @Field({ defaultValue: false })
  referred: boolean

  @Column() //db
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

  @Column()
  @Field(() => CoordsClass, { nullable: true })
  victimCoordinates: Coords

  @Column()
  @Field(() => CoordsClass, { nullable: true })
  caregiverCoordinates: Coords

  @Column()
  @Field({ defaultValue: 'pending' })
  status: string

  //column = db
  //field = graphql
  //field en daarin store je object van linked entity
  //resolver = resolve om id om te zetten naar object
}
