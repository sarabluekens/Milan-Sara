import { CreateUsedMaterialInput } from './create-used-material.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUsedMaterialInput extends PartialType(CreateUsedMaterialInput) {
  @Field(() => Int)
  id: number;
}
