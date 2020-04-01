import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
export class AB {
  @Field(() => Int)
  id: number;
  @Field(() => Int)
  a_id: number;
  @Field()
  b_id: number;
  @Field()
  note: string;
}
