import { InputType, Int, Field } from '@nestjs/graphql'

@InputType()
export class CreateEventInput {
  @Field() //graphql
  name: string

  @Field() //graphql
  address: string

  @Field() //graphql
  postalCode: string

  @Field() //graphql
  city: string

  @Field(() => [Date]) //graphql
  dates: Date[]

  @Field() //graphql
  startHour: string

  @Field() //graphql
  endHour: string

  @Field() //graphql
  contactPerson: string

  @Field() //graphql
  phoneNumer: string

  @Field() //graphql
  email: string

  @Field() //graphql
  btwNumber: string

  @Field({ defaultValue: false }) //graphql
  eventWithChildren: boolean

  @Field() //graphql
  expectedVisitorStaffCount: number

  @Field() //graphql
  mapsLink: string
}
