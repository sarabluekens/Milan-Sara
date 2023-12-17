import { ObjectType, Field, InputType } from '@nestjs/graphql'
import { Column } from 'typeorm'

@ObjectType() //graphql
@InputType('MapCoordsInput')
export class MapCoords {
  @Column({ nullable: true }) // Database link - Typeorm
  @Field({ nullable: true })
  corner: string

  @Column({ nullable: true }) // Database link - Typeorm
  @Field({ nullable: true }) //graphql
  lat: number

  @Column({ nullable: true }) // Database link - Typeorm
  @Field({ nullable: true }) //graphql
  lng: number
}

export type MapCoordsType = {
  corner: string
  lat: number
  lng: number
}
