import { InputType, Int, Field } from '@nestjs/graphql'
import { IsNotEmpty, IsOptional } from 'class-validator'
import { MapCoords } from '../entities/mapCoords.entity'

export enum Status {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
  Completed = 'Completed',
}

@InputType()
export class CreateEventInput {
  @IsNotEmpty()
  @Field() //graphql
  name: string

  @IsNotEmpty()
  @Field() //graphql
  address: string

  @IsNotEmpty()
  @Field() //graphql
  postalCode: string

  @IsNotEmpty()
  @Field() //graphql
  city: string

  @IsNotEmpty()
  @Field(() => [Date]) //graphql
  dates: Date[]

  @IsNotEmpty()
  @Field() //graphql
  startHour: string

  @IsNotEmpty()
  @Field() //graphql
  endHour: string

  @IsNotEmpty()
  @Field() //graphql
  contactPerson: string

  @IsNotEmpty()
  @Field() //graphql
  phoneNumer: string

  @IsNotEmpty()
  @Field() //graphql
  email: string

  @IsNotEmpty()
  @Field() //graphql
  btwNumber: string

  @IsNotEmpty()
  @Field({ defaultValue: false }) //graphql
  eventWithChildren: boolean

  @IsNotEmpty()
  @Field() //graphql
  expectedVisitorStaffCount: number

  @IsNotEmpty()
  @Field() //graphql
  status: Status

  @IsNotEmpty()
  @Field() //graphql
  mapsLink: string

  @IsOptional()
  @Field(() => [MapCoords], { defaultValue: [] }) //graphql
  mapCoords: Array<MapCoords>
}
