import { CreateCaseInput } from './create-case.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCaseInput extends PartialType(CreateCaseInput) {
  @Field(() => Int)
  id: number;
}
