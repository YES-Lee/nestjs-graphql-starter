import { Resolver, Mutation, Args, Query, ResolveField, Parent } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UseGuards, Inject, forwardRef } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/graphql.guard';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { UserListResult } from '../../graphql/schemas/user/list.result';
import { UserListArgs } from '../../graphql/schemas/user/list.args';
import { UserEntity } from '../../database/entities/user.entity';
import { UserGroupResolver } from '../user-group/user-group.resolver';
import { UserGroupListResult } from '../../graphql/schemas/user-group/list.result';
import { GroupListResult } from '../../graphql/schemas/group/list.result';
import { GroupResolver } from '../group/group.resolver';
import { Int } from '@nestjs/graphql';

@Resolver(() => UserEntity)
export class UserResolver {
  @Inject(UserService)
  private userService: UserService;

  @Inject(forwardRef(() => UserGroupResolver))
  private userGroupResolver: UserGroupResolver;

  @Inject(GroupResolver)
  private groupResolver: GroupResolver;

  @UseGuards(GqlAuthGuard)
  @Query(returns => UserEntity, { description: '获取当前登录用户信息' })
  getCurrentUser(@CurrentUser()/* 使用@CurrentUser从context中注入token解析出来的user */ user: any) {
    return this.userService.getCurrent(user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(returns => UserListResult, { description: '获取用户列表' })
  userList(@Args() data: UserListArgs) {
    return this.userService.getUserList(data);
  }

  @ResolveField(() => UserGroupListResult)
  userGroups(
    @Parent() user: UserEntity,
    @Args({ name: 'page', type: () => Int }) page: number,
    @Args({ name: 'pageSize', type: () => Int }) pageSize: number
  ): Promise<UserGroupListResult> {
    return this.userGroupResolver.listByUserId(user.id, page, pageSize);
  }

  @ResolveField(() => GroupListResult)
  groups(
    @Parent() user: UserEntity,
    @Args({ name: 'page', type: () => Int }) page: number,
    @Args({ name: 'pageSize', type: () => Int }) pageSize: number
    ): Promise<GroupListResult> {
    return this.groupResolver.listByUserId(user.id, page, pageSize);
  }

  getById(id: number): Promise<UserEntity> {
    return this.userService.getById(id);
  }
}
