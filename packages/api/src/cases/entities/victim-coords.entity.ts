import { ObjectType, Field, InputType } from '@nestjs/graphql'

import { GraphQLLongitude, GraphQLLatitude } from 'graphql-scalars'
import { Double } from 'typeorm'

@ObjectType()
@InputType('VictimCoordsInput')
export class VictimCoordsClass {
  @Field(() => GraphQLLatitude)
  lat: Double

  @Field(() => GraphQLLongitude)
  lng: Double
}

export type VictimCoords = {
  lat: number
  lng: number
}
