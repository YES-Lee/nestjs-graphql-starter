import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/graphql.guard';
import { LoginResult } from '../../graphql/schemas/user/login.result';
import { LoginInput } from '../../graphql/schemas/user/login.input';
import { UserDetailResult } from '../../graphql/schemas/user/user-detail.result';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { UserListResult } from '../../graphql/schemas/user/list.result';
import { UserListArgs } from '../../graphql/schemas/user/list.args';
import { UserEntity } from '../../database/entities/user.entity';

@Resolver(() => LoginResult)
export class UserLoginResolver {
  constructor(private userService: UserService) {}

  @Mutation(returns => LoginResult, { description: '用户登录' })
  login(@Args('account') account: LoginInput) {
    return this.userService.login(account);
  }
}
