import { CreateVictimInput } from './create-victim.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateVictimInput extends PartialType(CreateVictimInput) {
  @Field(() => Int)
  id: number;
}