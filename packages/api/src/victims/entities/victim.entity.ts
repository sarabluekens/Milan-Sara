import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Victim {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
