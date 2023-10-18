import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUsedMaterialInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
