import { CreateCaregiverInput } from './create-caregiver.input'
import { InputType, Field, Int, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateCaregiverInput extends PartialType(CreateCaregiverInput) {
  @Field(() => Int)
  id: number
}
