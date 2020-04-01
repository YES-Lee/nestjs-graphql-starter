import { Resolver, Query, ResolveProperty, Parent } from '@nestjs/graphql';
import { A } from '../../graphql/schemas/a.gql';

import data from '../../graphql/mock';
import { B } from '../../graphql/schemas/b.gql';
import { AB } from '../../graphql/schemas/a-b.gql';
import { Inject, forwardRef } from '@nestjs/common';
import { AbResolver } from './ab.resolver';
import { BResolver } from './b.resolver';

@Resolver(A)
export class AResolver {
  @Inject(forwardRef(() => AbResolver))
  private abResolver: AbResolver;

  @ResolveProperty(() => [B])
  bList(@Parent() a: A) {
    const list = this.abResolver.abListByAId(a.id);
    return list;
  }

  @Query(() => A)
  aById(id: number) {
    return data.a.find(item => item.id === id);
  }

  @Query(() => [A])
  aList() {
    return data.a;
  }

  @ResolveProperty(() => [AB])
  abList(@Parent() a: A) {
    return this.abResolver.abListByAId(a.id);
  }
}
