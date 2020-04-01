import { Resolver, ResolveProperty, Parent, Query } from '@nestjs/graphql';

import data from '../../graphql/mock';
import { B } from '../../graphql/schemas/b.gql';
import { AB } from '../../graphql/schemas/a-b.gql';
import { Inject, forwardRef } from '@nestjs/common';
import { AbResolver } from './ab.resolver';

@Resolver(B)
export class BResolver {
  @Inject(forwardRef(() => AbResolver))
  private abResolver: AbResolver;

  @Query(() => B)
  bById(id: number) {
    return data.a.find(item => item.id === id);
  }

  @ResolveProperty(() => [AB])
  abList(@Parent() b: B) {
    return this.abResolver.abListByBId(b.id);
  }
}
