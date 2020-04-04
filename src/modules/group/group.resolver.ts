import { Resolver, Query, Args } from '@nestjs/graphql';
import { GroupEntity } from '../../database/entities/group.entity';
import { Inject } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupListResult } from '../../graphql/schemas/group/list.result';
import { Int } from 'type-graphql';

@Resolver(GroupEntity)
export class GroupResolver {
  @Inject(GroupService)
  private groupService: GroupService;

  @Query(() => GroupEntity)
  groupById(@Args({ name: 'id', type: () => Int }) id: number): Promise<GroupEntity> {
    return this.groupService.getById(id);
  }

  listByUserId(
    @Args({ name: 'userId', type: () => Int }) userId: number,
    @Args({ name: 'page', type: () => Int }) page: number,
    @Args({ name: 'pageSize', type: () => Int }) pageSize: number): Promise<GroupListResult> {
    return this.groupService.listByUserId(userId, page, pageSize);
  }
}
