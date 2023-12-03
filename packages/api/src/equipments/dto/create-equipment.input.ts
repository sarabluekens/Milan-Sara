import { InputType, Int, Field } from '@nestjs/graphql'
import { IsNotEmpty, IsOptional } from 'class-validator'
import { ReservedStock } from '../entities/reserverdStock.entity'

@InputType()
export class CreateEquipmentInput {
  @IsNotEmpty()
  @Field() //graphql
  name: string

  @IsNotEmpty()
  @Field() //graphql
  category: string

  @IsOptional()
  @Field() //graphql
  description?: string

  @IsNotEmpty()
  @Field({ defaultValue: 0 }) //graphql
  totalStock: number

  @IsOptional()
  @Field(() => [ReservedStock], { defaultValue: [] }) //graphql
  reservedStock: Array<ReservedStock>

  @IsNotEmpty()
  @Field({ defaultValue: true }) //graphql
  available: boolean

  @IsNotEmpty()
  @Field() //graphql
  expirationDate: Date
}
