import { Resolver, Query, Args, ResolveProperty, Parent } from '@nestjs/graphql';
import { GroupEntity } from '../../database/entities/group.entity';
import { Inject, forwardRef } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupListResult } from '../../graphql/schemas/group/list.result';
import { Int } from 'type-graphql';
import { UserGroupEntity } from '../../database/entities/user-group.entity';
import { UserGroupResolver } from '../user-group/user-group.resolver';

@Resolver(GroupEntity)
export class GroupResolver {
  @Inject(GroupService)
  private groupService: GroupService;

  @Inject(forwardRef(() => UserGroupResolver))
  private userGroupResolver: UserGroupResolver;

  @Query(() => GroupEntity)
  groupById(@Args({ name: 'id', type: () => Int }) id: number): Promise<GroupEntity> {
    return this.groupService.getById(id);
  }

  listByUserId(
    userId: number,
    page: number,
    pageSize: number): Promise<GroupListResult> {
    return this.groupService.listByUserId(userId, page, pageSize);
  }

  @ResolveProperty(() => UserGroupEntity)
  userGroup(@Parent() group: GroupEntity): Promise<UserGroupEntity> {
    return this.userGroupResolver.getById(group.id);
  }
}
