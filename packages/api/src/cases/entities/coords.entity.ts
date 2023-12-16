import { ObjectType, Field, InputType } from '@nestjs/graphql'

import { GraphQLLongitude, GraphQLLatitude } from 'graphql-scalars'
import { Double } from 'typeorm'

@ObjectType()
@InputType('CoordsInput')
export class CoordsClass {
  @Field(() => GraphQLLatitude)
  lat: Double

  @Field(() => GraphQLLongitude)
  lng: Double
}

export type Coords = {
  lat: number
  lng: number
}
